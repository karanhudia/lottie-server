import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import Fastify from 'fastify';
import { type AddressInfo } from 'node:net';
import { io as ioClient, type Socket as ClientSocket } from 'socket.io-client';
import { type Socket as ServerSocket } from 'socket.io';

import {
  LottieSocketEvents,
  SocketAcknowledgement,
  UpdateLottieBroadcast,
  UpdateLottieMessage,
} from '../graphql/generated';
import fastifyIO from 'fastify-socket.io';
import { ClientToServerEvents, registerSockets, ServerToClientEvents } from './socket';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mongoDbPlugin } from './db';
import { mockLottieAnimation } from '../tests/mocks/mockLottieAnimation';
import mongoose from 'mongoose';
import { Lottie } from '../models/lottie';

const mockAcknowledgement: SocketAcknowledgement = { code: 200, status: 'ok' };
const mockUpdateLottieMessage: UpdateLottieMessage = {
  __typename: 'UpdateLottieSpeedMessage',
  uuid: 'custom-uuid',
  version: 1,
  payload: {
    frameRate: 40,
  },
};

describe('WebSocket tests', () => {
  let clientSocket: ClientSocket<ServerToClientEvents, ClientToServerEvents>;
  let serverSocket: ServerSocket<ClientToServerEvents, ServerToClientEvents>;

  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
      level: 'info',
    },
  });

  let mongod: MongoMemoryServer;

  // Setup server and MongoDB
  beforeAll(async () => {
    // Setup MongoDB memory server
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri('database');

    // Register MongoDB plugin
    await fastify.register(mongoDbPlugin, { uri });

    // Register socket.io plugin
    await fastify.register(fastifyIO);

    await fastify.ready();

    // Register sockets
    registerSockets(fastify);

    fastify.io.on('connection', (socket) => {
      serverSocket = socket;
    });

    // Start the server
    await fastify.listen();
    const port = (fastify.server.address() as AddressInfo).port;

    // Connect to WebSocket from client
    clientSocket = ioClient(`ws://localhost:${String(port)}`, {
      transports: ['websocket'],
    });
  });

  // Setup client connection before each test
  beforeEach((done) => {
    if (clientSocket.connected) {
      done();
    } else {
      clientSocket.once('connect', done);
    }
  });

  // Close all connections after tests
  afterAll(async () => {
    // Disconnect client socket
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }

    // Close Fastify server
    await fastify.close();

    // Drop MongoDB database and stop server
    await mongoose.connection.dropDatabase();
    await mongod.stop();
  });

  test('should create new JSON and acknowledge', async () => {
    const response = await clientSocket.emitWithAck(LottieSocketEvents.CreateJson, {
      uuid: 'custom-uuid',
      payload: {
        json: mockLottieAnimation,
      },
    });

    expect(response).toStrictEqual(mockAcknowledgement);
    await Lottie.findOne({ uuid: 'custom-uuid' }).then((result) => {
      expect(result?.version).toEqual(1);
    });
  });

  test('should show error for uuid not found', (done) => {
    const nonExistingLottieUpdate: UpdateLottieMessage = {
      __typename: 'UpdateLottieSpeedMessage',
      uuid: 'new-uuid',
      version: 1,
      payload: {
        frameRate: 10,
      },
    };

    clientSocket.emit(LottieSocketEvents.UpdateJson, nonExistingLottieUpdate, (response) => {
      expect(response.code).toBe(404);
      expect(response.status).toBe('Not Found');

      done();
    });
  });

  test('should handle version mismatch during JSON update', (done) => {
    clientSocket.emit(
      LottieSocketEvents.UpdateJson,
      { ...mockUpdateLottieMessage, version: 110 },
      (response) => {
        expect(response.code).toBe(409);
        expect(response.status).toBe('Version Mismatch');

        done();
      },
    );
  });

  test('should receive update json events (server receives)', (done) => {
    serverSocket.on(LottieSocketEvents.UpdateJson, (message) => {
      expect(message).toEqual(mockUpdateLottieMessage);
      done();
    });

    clientSocket.emit(LottieSocketEvents.UpdateJson, mockUpdateLottieMessage, () => undefined);
  });

  test('should broadcast update json events (client receives)', (done) => {
    const broadcastMessage: UpdateLottieBroadcast = {
      uuid: 'baf7f8c5-45f1-499b-a549-84d4c73fa082',
      version: 50,
      json: {
        foo: 'bar',
      },
    };

    clientSocket.on(LottieSocketEvents.UpdateJson, (message) => {
      expect(message).toStrictEqual(broadcastMessage);
      done();
    });

    serverSocket.emit(LottieSocketEvents.UpdateJson, broadcastMessage);
  });
});
