import { FastifyInstance } from 'fastify';

export const registerHealthRoute = (app: FastifyInstance, startedAt: number) => {
  app.get('/health', async () => {
    const now = Date.now();
    const uptimeSeconds = Math.floor((now - startedAt) / 1000);

    return {
      status: 'ok',
      service: 'amen-backend',
      uptime: uptimeSeconds,
      timestamp: new Date(now).toISOString()
    };
  });
};
