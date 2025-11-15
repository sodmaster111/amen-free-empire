import express from 'express';
import { healthRouter } from './routes/health';

const app = express();
const port = process.env.PORT ?? 3000;
const startedAt = Date.now();

// Express выбран из-за его простоты и огромного сообщества — это снижает порог входа и упрощает поддержку skeleton-сервиса.
app.use(express.json());
app.use('/health', healthRouter(startedAt));

app.get('/', (_req, res) => {
  res.json({ message: 'amen-backend is running' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`amen-backend listening on port ${port}`);
});
