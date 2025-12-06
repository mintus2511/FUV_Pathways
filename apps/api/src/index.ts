import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import requirementRoutes from './routes/requirements';
import plannerRoutes from './routes/planner';
import chatRoutes from './routes/chat';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'fuv-planner-api' });
});

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/requirements', requirementRoutes);
app.use('/planner', plannerRoutes);
app.use('/chat', chatRoutes);

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
