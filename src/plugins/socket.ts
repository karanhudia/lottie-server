import { FastifyPluginAsync } from 'fastify';
import fastifyIO from 'fastify-socket.io';
import { Lottie } from '../models/lottie';
import { Server } from 'socket.io';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

type LottieJSONPayload = {
  uuid: string;
  json: JSON;
};

enum LottieJSONSocketEvent {
  CreateJSON = 'createJSON',
  UpdateJSON = 'updateJSON',
}

export const fastifySocketIo: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyIO);

  fastify.io.on('connection', (socket) => {
    fastify.log.info('Socket connected!', socket.id);

    socket.on(LottieJSONSocketEvent.CreateJSON, async (message: LottieJSONPayload) => {
      fastify.log.info('Creating new Editable JSON lottie');

      await Lottie.create({
        createdAt: new Date(),
        updatedAt: new Date(),
        ...message,
      });

      fastify.log.info('Added new JSON lottie');
    });

    socket.on(LottieJSONSocketEvent.UpdateJSON, async (message: LottieJSONPayload) => {
      fastify.log.info('Updating existing UUID', message.uuid);

      await Lottie.updateOne(
        { uuid: message.uuid },
        {
          $set: {
            updatedAt: new Date(),
            ...message,
          },
        },
      );

      fastify.log.info('Updated JSON lottie with UUID: ', message.uuid);
    });
  });

  fastify.addHook('onReady', () => {
    fastify.log.info('WebSocket server ready');
  });
};
