import Fastify, { FastifyInstance } from 'fastify';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mongoDbPlugin } from './db';
import { Lottie } from '../models/lottie';
import mongoose from 'mongoose';

describe('mongoDbPlugin', () => {
  let fastify: FastifyInstance;
  let mongod: MongoMemoryServer;
  const logMessages: unknown[] = [];

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    fastify = Fastify();

    fastify.log = {
      ...fastify.log,
      info: (msg: unknown) => logMessages.push(msg),
      error: (msg: unknown) => logMessages.push(msg),
    };
    await fastify.register(mongoDbPlugin, { uri });
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
    await mongod.stop();
  });

  test('should connect to MongoDB and log connection events', () => {
    expect(fastify.hasDecorator('db')).toBeTruthy();
    expect(fastify.db.models).toBeDefined();
    expect(fastify.db.models.Lottie).toBe(Lottie);
  });

  test('should have Lottie model decorated on fastify instance', () => {
    expect(fastify.db).toBeDefined();
    expect(fastify.db.models).toBeDefined();
    expect(fastify.db.models.Lottie).toBe(Lottie);
  });

  test('should connect to MongoDB and log connection events', async () => {
    expect(logMessages).toContain('MongoDB connected');
    await mongoose.disconnect();
    expect(logMessages).toContain('MongoDB disconnected');
  });
});
