import { Course, RequirementGroup, RequirementItem, StudentPlanEntry } from './types';

const gradePoints: Record<string, number> = {
  A: 4.0,
  'A-': 3.7,
  B+: 3.3,
  B: 3.0,
  'B-': 2.7,
  C+: 2.3,
  C: 2.0,
  'C-': 1.7,
  D+: 1.3,
  D: 1.0,
  F: 0,
};

export function calculateGpa(plans: StudentPlanEntry[], courses: Course[]): number | null {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const entry of plans.filter((p) => p.status === 'completed' && p.grade)) {
    const course = courses.find((c) => c.id === entry.courseId);
    if (!course) continue;
    const gradeValue = entry.grade ? gradePoints[entry.grade] : undefined;
    if (gradeValue === undefined) continue;
    totalPoints += gradeValue * course.credits;
    totalCredits += course.credits;
  }

  if (totalCredits === 0) return null;
  return Number((totalPoints / totalCredits).toFixed(2));
}

export function totalCredits(plans: StudentPlanEntry[], courses: Course[], { excludeMoet } = { excludeMoet: true }, requirementGroups: RequirementGroup[] = [], requirementItems: RequirementItem[] = []): number {
  const moetCourseIds = new Set(
    requirementItems
      .filter((item) => {
        const group = requirementGroups.find((g) => g.id === item.requirementGroupId);
        return group?.type === 'moet';
      })
      .map((item) => item.courseId)
  );

  return plans
    .filter((p) => p.status === 'completed')
    .reduce((sum, entry) => {
      if (excludeMoet && moetCourseIds.has(entry.courseId)) return sum;
      const course = courses.find((c) => c.id === entry.courseId);
      return course ? sum + course.credits : sum;
    }, 0);
}

function canCountCourse(courseId: string, counts: Record<string, number>): boolean {
  const current = counts[courseId] ?? 0;
  if (current >= 2) return false;
  counts[courseId] = current + 1;
  return true;
}

export interface RequirementProgress {
  completed: number;
  required: number;
  percent: number;
}

export function computeRequirementProgress({
  plans,
  courses,
  requirementGroups,
  requirementItems,
}: {
  plans: StudentPlanEntry[];
  courses: Course[];
  requirementGroups: RequirementGroup[];
  requirementItems: RequirementItem[];
}) {
  const completedCourseIds = new Set(plans.filter((p) => p.status === 'completed').map((p) => p.courseId));
  const doubleCountTracker: Record<string, number> = {};

  const progressByGroup: Record<string, RequirementProgress> = {};
  for (const group of requirementGroups) {
    const items = requirementItems.filter((item) => item.requirementGroupId === group.id);
    let completedCredits = 0;

    for (const item of items) {
      const equivalentCourseId = resolveCrossList(item.courseId, courses, completedCourseIds);
      if (!equivalentCourseId) continue;
      if (!canCountCourse(equivalentCourseId, doubleCountTracker)) continue;
      const course = courses.find((c) => c.id === equivalentCourseId);
      if (course) {
        completedCredits += course.credits;
      }
    }

    progressByGroup[group.id] = {
      completed: completedCredits,
      required: group.creditsRequired,
      percent: Math.min(100, Math.round((completedCredits / Math.max(1, group.creditsRequired)) * 100)),
    };
  }

  return progressByGroup;
}

function resolveCrossList(courseId: string, courses: Course[], completed: Set<string>) {
  if (completed.has(courseId)) return courseId;
  const alt = courses.find((c) => c.crossListedWith?.includes(courseId) && completed.has(c.id));
  return alt?.id;
}

export function computeCapstoneEligibility({
  totalCreditsEarned,
  coreGroupIds,
  foundationGroupIds,
  requirementProgress,
}: {
  totalCreditsEarned: number;
  coreGroupIds: string[];
  foundationGroupIds: string[];
  requirementProgress: Record<string, RequirementProgress>;
}) {
  const reasons: string[] = [];
  if (totalCreditsEarned < 80) {
    reasons.push('Need at least 80 credits completed');
  }

  const coreMet = coreGroupIds.every((id) => (requirementProgress[id]?.completed ?? 0) >= (requirementProgress[id]?.required ?? 0));
  if (!coreMet) {
    reasons.push('Complete all core curriculum requirements');
  }

  const foundationMet = foundationGroupIds.every((id) => (requirementProgress[id]?.completed ?? 0) >= (requirementProgress[id]?.required ?? 0));
  if (!foundationMet) {
    reasons.push('Finish foundational major requirements');
  }

  return { eligible: reasons.length === 0, reasons };
}

export function exploratoryAreaCounts({
  requirementGroups,
  requirementItems,
  progress,
}: {
  requirementGroups: RequirementGroup[];
  requirementItems: RequirementItem[];
  progress: Record<string, RequirementProgress>;
}) {
  const byArea: Record<string, number> = {};
  const exploratoryGroups = requirementGroups.filter((g) => g.type === 'exploratory');
  for (const group of exploratoryGroups) {
    const areaKey = group.majorOrMinorKey ?? group.name;
    const completed = progress[group.id]?.completed ?? 0;
    byArea[areaKey] = (byArea[areaKey] ?? 0) + completed;
  }
  return byArea;
}
