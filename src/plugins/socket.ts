import { FastifyPluginAsync } from 'fastify';
import fastifyIO from 'fastify-socket.io';
import { Lottie } from "../models/lottieModel";

type LottieJSONPayload = {
    uuid: string;
    json: JSON;
}

enum LottieJSONSocketEvent {
    CreateJSON = 'createJSON',
    UpdateJSON = 'updateJSON'
}

export const fastifySocketIo: FastifyPluginAsync = async (fastify) => {
    await fastify.register(fastifyIO);

    // @ts-ignore
    fastify.io.on('connection', (socket) => {
        fastify.log.info('Socket connected!', socket.id);

        socket.on(LottieJSONSocketEvent.CreateJSON, (message: LottieJSONPayload) => {
            fastify.log.info("Creating new Editable JSON lottie");

            Lottie.create({
                createdAt: new Date(),
                updatedAt: new Date(),
                ...message
            });
        })

        socket.on(LottieJSONSocketEvent.UpdateJSON, (message: LottieJSONPayload) => {
            fastify.log.info("Updating existing UUID", message.uuid);

            Lottie.updateOne(
                { uuid: message.uuid },
                {
                    $set: {
                        updatedAt: new Date(),
                        ...message
                    }
                }
            );
        })
    });

    fastify.addHook('onReady', async () => {
        fastify.log.info('WebSocket server ready');
    });
};
