import express from 'express';
import { healthRouter } from './routes/health.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/health', healthRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'amen-backend is running' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`amen-backend listening on port ${port}`);
});
