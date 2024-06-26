import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifySocketIo } from './plugins/socket';
import { mongoDbPlugin } from './plugins/db';
import { registerRoutes } from './routes/mainRoutes';
import { registerGraphQLRoutes } from './routes/graphqlRoutes';

const host = 'RENDER' in process.env ? `0.0.0.0` : `localhost`;
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const start = async () => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
      level: 'debug',
    },
  });

  // CORS policy
  await fastify.register(cors, {
    origin: true,
  });

  fastify.log.info('CORS registered');

  await fastify.register(mongoDbPlugin);
  await fastify.register(fastifySocketIo);

  registerRoutes(fastify);
  registerGraphQLRoutes(fastify);

  try {
    await fastify.listen({
      host,
      port,
    });
    fastify.log.info(`Server started on ${JSON.stringify(fastify.server.address())}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
