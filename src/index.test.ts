import { build } from './app';

import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';
import { FastifyInstance } from 'fastify';

describe('GET `/` route', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = await build();
  });

  afterAll(() => {
    void fastify.close();
  });

  test('websocket endpoint', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.headers['content-type']).toStrictEqual('application/json; charset=utf-8');
    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual(JSON.stringify({ message: 'Websockets connected' }));
  });

  test('health endpoint', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.headers['content-type']).toStrictEqual('application/json; charset=utf-8');
    expect(response.statusCode).toStrictEqual(200);
    expect(response.body).toStrictEqual(JSON.stringify({ status: 'ok' }));
  });
});
