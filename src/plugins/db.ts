import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { connect, connection } from 'mongoose';
import { Lottie } from '../models/lottie';

interface DbConnectorOptions {
  uri: string;
}

const dbConnector: FastifyPluginAsync<DbConnectorOptions> = async (fastify, options) => {
  const { uri } = options;

  if (!uri) {
    fastify.log.error('MongoDB URI not provided');
    return;
  }

  try {
    connection.on('connected', () => {
      fastify.log.info('MongoDB connected');
    });
    connection.on('disconnected', () => {
      fastify.log.error('MongoDB disconnected');
    });
    await connect(uri);

    const models = { Lottie };
    fastify.decorate('db', { models });
  } catch (error) {
    fastify.log.error(error);
  }
};

export const mongoDbPlugin = fp(dbConnector);
