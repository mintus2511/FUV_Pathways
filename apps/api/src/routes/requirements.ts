import { Router } from 'express';
import { prisma } from '../prisma';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  const groups = await prisma.requirementGroup.findMany({ include: { requirementItems: true } });
  res.json(groups);
});

router.post('/groups', auth('admin'), async (req, res) => {
  const group = await prisma.requirementGroup.create({ data: req.body });
  res.status(201).json(group);
});

router.put('/groups/:id', auth('admin'), async (req, res) => {
  const group = await prisma.requirementGroup.update({ where: { id: req.params.id }, data: req.body });
  res.json(group);
});

router.delete('/groups/:id', auth('admin'), async (req, res) => {
  await prisma.requirementGroup.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

router.post('/items', auth('admin'), async (req, res) => {
  const item = await prisma.requirementItem.create({ data: req.body });
  res.status(201).json(item);
});

router.delete('/items/:id', auth('admin'), async (req, res) => {
  await prisma.requirementItem.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
