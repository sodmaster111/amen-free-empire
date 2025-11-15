import { Router } from 'express';

export const healthRouter = (startedAt: number) => {
  const router = Router();

  router.get('/', (_req, res) => {
    const now = Date.now();
    const uptimeSeconds = Math.floor((now - startedAt) / 1000);

    res.json({
      status: 'ok',
      service: 'amen-backend',
      uptime: uptimeSeconds,
      timestamp: new Date(now).toISOString()
    });
  });

  return router;
};
