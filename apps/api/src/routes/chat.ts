import { Router } from 'express';
import { auth } from '../middleware/auth';
import { prisma } from '../prisma';

const router = Router();

router.get('/:courseId', auth(), async (req, res) => {
  const { courseId } = req.params;
  const messages = await prisma.chatMessage.findMany({
    where: { courseId },
    orderBy: { createdAt: 'asc' },
    take: 100,
  });
  res.json(messages);
});

router.post('/:courseId', auth(), async (req, res) => {
  const { courseId } = req.params;
  const userId = (req as any).user.userId as string;
  const message = await prisma.chatMessage.create({ data: { courseId, userId, message: req.body.message } });
  res.status(201).json(message);
});

export default router;
