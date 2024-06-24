import { FastifyPluginAsync } from 'fastify';
import fastifyIO from 'fastify-socket.io';
import { Lottie } from '../models/lottie';
import { Server } from 'socket.io';
import {
  deleteLottieLayerProperty,
  updateLottieColorProperty,
  updateLottieSpeedProperty,
} from '../utils/lottie';
import {
  CreateLottieMessage,
  LottieAnimation,
  LottieSocketEvents,
  SocketAcknowledgement,
  UpdateLottieMessage,
} from '../graphql/generated';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

export const fastifySocketIo: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyIO);

  fastify.io.on('connection', (socket) => {
    fastify.log.info('Socket connected!', socket.id);

    socket.on(
      LottieSocketEvents.CreateJson,
      async (
        message: CreateLottieMessage,
        acknowledgement: (response: SocketAcknowledgement) => void,
      ) => {
        fastify.log.info('Creating:: JSON lottie');

        try {
          await Lottie.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            uuid: message.uuid,
            json: message.payload?.json,
          });

          fastify.log.info('Created:: JSON lottie');

          acknowledgement({
            code: 200,
            status: 'ok',
          });
        } catch {
          fastify.log.error('Error:: JSON lottie');

          acknowledgement({
            code: 500,
            status: 'Could not create new JSON',
          });
        }
      },
    );

    socket.on(
      LottieSocketEvents.UpdateJson,
      async (
        message: UpdateLottieMessage,
        acknowledgement: (response: SocketAcknowledgement) => void,
      ) => {
        fastify.log.info(`Updating(${message.uuid}):: JSON lottie`);

        const foundLottie = await Lottie.findOne({ uuid: message.uuid });

        if (!foundLottie) {
          fastify.log.error(`Updating(${message.uuid}):: JSON lottie not found`);

          acknowledgement({
            code: 404,
            status: 'Could not find JSON',
          });

          return;
        }

        try {
          let updatedLottie = undefined;

          switch (message.payload.__typename) {
            case 'ColorPayload':
              updatedLottie = updateLottieColorProperty(
                fastify,
                foundLottie.json as LottieAnimation,
                message.payload.layer,
                message.payload.shape,
                message.payload.shapeItem,
                message.payload.color,
              );

              fastify.log.info(`Updating(${message.uuid}):: JSON lottie color`);
              break;

            case 'SpeedPayload':
              updatedLottie = updateLottieSpeedProperty(
                foundLottie.json as LottieAnimation,
                message.payload.frameRate,
              );

              fastify.log.info(`Updating(${message.uuid}):: JSON lottie speed`);
              break;
            case 'LayerPayload':
              updatedLottie = deleteLottieLayerProperty(
                fastify,
                foundLottie.json as LottieAnimation,
                message.payload.layer,
              );

              fastify.log.info(`Updating(${message.uuid}):: JSON lottie layer deleted`);
              break;
          }

          await Lottie.updateOne(
            { uuid: message.uuid },
            {
              $set: {
                updatedAt: new Date(),
                json: updatedLottie,
              },
            },
          );

          // Broadcast this change to every client except the sender
          socket.broadcast.emit(LottieSocketEvents.UpdateJson, message);

          fastify.log.info(`Updating(${message.uuid}):: JSON lottie successfully updated`);

          acknowledgement({
            code: 200,
            status: 'ok',
          });
        } catch {
          fastify.log.error(`Updating(${message.uuid}):: Internal Server Error`);

          acknowledgement({
            code: 500,
            status: 'Could not update JSON',
          });
        }
      },
    );
  });

  fastify.addHook('onReady', () => {
    fastify.log.info('WebSocket server ready');
  });
};
