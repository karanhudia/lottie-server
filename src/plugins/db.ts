import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { connect, connection } from 'mongoose';
import { Lottie } from '../models/lottie';

const dbConnector: FastifyPluginCallback = (fastify, _opts, done) => {
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
    void connect(process.env.MONGODB_URI);

    const models = { Lottie };
    fastify.decorate('db', { models });
  } catch (error) {
    fastify.log.error(error);
  }

  done();
};

export const mongoDbPlugin = fp(dbConnector);
