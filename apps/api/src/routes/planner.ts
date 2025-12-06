import { Router } from 'express';
import { auth } from '../middleware/auth';
import { prisma } from '../prisma';
import {
  calculateGpa,
  computeCapstoneEligibility,
  computeRequirementProgress,
  exploratoryAreaCounts,
  totalCredits,
} from '@fuv/shared';

const router = Router();

router.get('/', auth(), async (req, res) => {
  const userId = (req as any).user.userId as string;
  const [plans, courses, requirementGroups, requirementItems] = await Promise.all([
    prisma.studentPlan.findMany({ where: { userId } }),
    prisma.course.findMany(),
    prisma.requirementGroup.findMany(),
    prisma.requirementItem.findMany(),
  ]);

  const progressByGroup = computeRequirementProgress({ plans, courses, requirementGroups, requirementItems });
  const total = totalCredits(plans, courses, { excludeMoet: true }, requirementGroups, requirementItems);
  const gpa = calculateGpa(plans, courses);
  const exploratory = exploratoryAreaCounts({ requirementGroups, requirementItems, progress: progressByGroup });
  const capstone = computeCapstoneEligibility({
    totalCreditsEarned: total,
    coreGroupIds: requirementGroups.filter((g) => g.type === 'core').map((g) => g.id),
    foundationGroupIds: requirementGroups.filter((g) => g.type === 'major' && g.name.toLowerCase().includes('foundation')).map((g) => g.id),
    requirementProgress: progressByGroup,
  });

  res.json({
    plans,
    progressByGroup,
    totalCredits: total,
    gpa,
    exploratory,
    capstone,
  });
});

router.post('/', auth(), async (req, res) => {
  const userId = (req as any).user.userId as string;
  const entry = await prisma.studentPlan.create({ data: { ...req.body, userId } });
  res.status(201).json(entry);
});

router.put('/:id', auth(), async (req, res) => {
  const userId = (req as any).user.userId as string;
  const entry = await prisma.studentPlan.update({ where: { id: req.params.id, userId }, data: req.body });
  res.json(entry);
});

router.delete('/:id', auth(), async (req, res) => {
  const userId = (req as any).user.userId as string;
  await prisma.studentPlan.delete({ where: { id: req.params.id, userId } });
  res.status(204).send();
});

export default router;
