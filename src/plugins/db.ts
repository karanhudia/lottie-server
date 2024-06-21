import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { connection, connect } from 'mongoose';
import { Lottie } from '../models/lottie';

const dbConnector: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  if (!process.env.MONGODB_URI) {
    return;
  }

  try {
    connection.on('connected', () => {
      fastify.log.info('MongoDB connected');
    });
    connection.on('disconnected', () => {
      fastify.log.error('MongoDB disconnected');
    });
    await connect(process.env.MONGODB_URI);

    const models = { Lottie };
    fastify.decorate('db', { models });
  } catch (error) {
    fastify.log.error(error);
  }
};

export const mongoDbPlugin = fp(dbConnector);
