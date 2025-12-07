import { Router } from 'express';
import { prisma } from '../prisma';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  const { search, department } = req.query as { search?: string; department?: string };
  const courses = await prisma.course.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        department ? { department } : {},
      ],
    },
    orderBy: { code: 'asc' },
  });
  res.json(courses);
});

router.get('/:id', async (req, res) => {
  const course = await prisma.course.findUnique({ where: { id: req.params.id } });
  if (!course) return res.status(404).json({ error: 'Not found' });
  const requirements = await prisma.requirementItem.findMany({
    where: { courseId: course.id },
    include: { requirementGroup: true },
  });
  res.json({ course, requirements });
});

router.post('/', auth('admin'), async (req, res) => {
  const { code, title, credits, instructor, schedule, description, learningOutcomes, department, isActive, crossListedWith } =
    req.body;
  const course = await prisma.course.create({
    data: {
      code,
      title,
      credits,
      instructor,
      schedule,
      description,
      learningOutcomes,
      department,
      isActive: isActive ?? true,
      crossListedWith,
    },
  });
  res.status(201).json(course);
});

router.put('/:id', auth('admin'), async (req, res) => {
  const course = await prisma.course.update({ where: { id: req.params.id }, data: req.body });
  res.json(course);
});

router.delete('/:id', auth('admin'), async (req, res) => {
  await prisma.course.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
