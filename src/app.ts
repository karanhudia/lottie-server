import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyIO from 'fastify-socket.io';
import { mongoDbPlugin } from './plugins/db';
import { registerRoutes } from './routes/mainRoutes';
import { registerGraphQLRoutes } from './routes/graphqlRoutes';
import { registerSockets } from './routes/sockets';

export const build = () => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
      level: 'info',
    },
  });

  // CORS policy
  void fastify
    .register(cors, {
      origin: '*',
    })
    .ready()
    .then(() => {
      fastify.log.info('CORS registered');
    });

  void fastify
    .register(mongoDbPlugin, {
      uri: process.env.MONGODB_URI ?? '',
    })
    .ready()
    .then(() => {
      fastify.log.info('MongoDB registered');
    });

  void fastify
    .register(fastifyIO, {
      cors: {
        origin: '*',
      },
    })
    .ready()
    .then(() => {
      fastify.log.info('WebSocket server ready');

      registerSockets(fastify);
    });

  registerRoutes(fastify);
  registerGraphQLRoutes(fastify);

  return fastify;
};
