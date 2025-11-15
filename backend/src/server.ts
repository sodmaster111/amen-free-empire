import Fastify from 'fastify';
import { registerDonateEndpoint } from '../api/donate';
import { registerHealthRoute } from './routes/health';

const app = Fastify({
  logger: true
});

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '0.0.0.0';
const startedAt = Date.now();

registerHealthRoute(app, startedAt);
registerDonateEndpoint(app);

app.get('/', async () => ({ message: 'amen-backend is running' }));

const start = async () => {
  try {
    await app.listen({ port, host });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
