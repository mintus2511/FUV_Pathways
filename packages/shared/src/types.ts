export type Role = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  instructor?: string;
  schedule?: string;
  description?: string;
  learningOutcomes?: string;
  department?: string;
  isActive: boolean;
  crossListedWith?: string[];
}

export type RequirementGroupType =
  | 'core'
  | 'exploratory'
  | 'major'
  | 'minor'
  | 'moet'
  | 'elp'
  | 'capstone';

export interface RequirementGroup {
  id: string;
  name: string;
  type: RequirementGroupType;
  majorOrMinorKey?: string;
  creditsRequired: number;
  notes?: string;
}

export interface RequirementItem {
  id: string;
  requirementGroupId: string;
  courseId: string;
  isOptional?: boolean;
  bucket?: string;
}

export type PlanStatus = 'completed' | 'in_progress' | 'planned';

export interface StudentPlanEntry {
  id: string;
  userId: string;
  courseId: string;
  status: PlanStatus;
  grade?: string;
  semester: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  courseId: string;
  userId: string;
  message: string;
  createdAt: Date;
}

export interface ProgressSummary {
  totalCredits: number;
  coreCompleted: number;
  coreRequired: number;
  exploratoryByArea: Record<string, number>;
  majorProgress: Record<string, number>;
  minorProgress: Record<string, number>;
  moetCompleted: boolean;
  elpCredits: number;
  capstoneEligible: boolean;
  capstoneReasons: string[];
  gpa: number | null;
}
