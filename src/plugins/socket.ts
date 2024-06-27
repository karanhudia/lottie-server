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
  UpdateLottieBroadcast,
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
            json: message.payload?.json as object,
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
        const { uuid, payload, version } = message;

        fastify.log.info(`Updating(${uuid}):: JSON lottie`);

        const foundLottie = await Lottie.findOne({ uuid });

        if (!foundLottie) {
          fastify.log.error(`Updating(${uuid}):: JSON lottie not found`);

          acknowledgement({
            code: 404,
            status: 'Not Found',
          });

          return; // Breaks the statement going forward
        }

        if (foundLottie.version !== version) {
          fastify.log.error(
            `Updating(${uuid}):: Version Mismatch - GOT-${String(version)} FOUND-${String(foundLottie.version)}`,
          );

          acknowledgement({
            code: 409,
            status: 'Version Mismatch',
          });

          return; // Breaks the statement going forward
        }

        try {
          let updatedLottie = undefined;

          switch (payload.__typename) {
            case 'ColorPayload':
              updatedLottie = updateLottieColorProperty(
                fastify,
                foundLottie.json as LottieAnimation,
                payload.layer,
                payload.shape,
                payload.shapeItem,
                payload.color,
              );

              fastify.log.info(`Updating(${uuid}):: JSON lottie color`);
              break;

            case 'SpeedPayload':
              updatedLottie = updateLottieSpeedProperty(
                foundLottie.json as LottieAnimation,
                payload.frameRate,
              );

              fastify.log.info(`Updating(${uuid}):: JSON lottie speed`);
              break;
            case 'LayerPayload':
              updatedLottie = deleteLottieLayerProperty(
                fastify,
                foundLottie.json as LottieAnimation,
                payload.layer,
              );

              fastify.log.info(`Updating(${uuid}):: JSON lottie layer deleted`);
              break;
          }

          const newVersion = version + 1;

          // Update the db with latest change
          await Lottie.updateOne(
            { uuid },
            {
              $set: {
                updatedAt: new Date(),
                json: updatedLottie,
                version: newVersion,
              },
            },
          );

          // Broadcast this change to every client including the sender
          fastify.io.emit(LottieSocketEvents.UpdateJson, {
            version: newVersion,
            uuid,
            json: updatedLottie,
          } as UpdateLottieBroadcast);

          fastify.log.info(`Updating(${uuid}):: JSON lottie successfully updated`);

          acknowledgement({
            code: 200,
            status: 'ok',
          });
        } catch {
          fastify.log.error(`Updating(${uuid}):: Internal Server Error`);

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
