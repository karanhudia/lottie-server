import { FastifyPluginAsync } from 'fastify';
import fastifyIO from 'fastify-socket.io';
import { Lottie } from "../models/lottieModel";

type LottieJSONPayload = {
    uuid: string;
    json: JSON;
}

export const fastifySocketIo: FastifyPluginAsync = async (fastify) => {
    await fastify.register(fastifyIO);

    // @ts-ignore
    fastify.io.on('connection', (socket: any) => {
        fastify.log.info('Socket connected!', socket.id);

        socket.on('createJSON', (message: LottieJSONPayload) => {
            fastify.log.info("Creating new Editable JSON lottie");

            Lottie.create({
                created_at: new Date(),
                last_modified: new Date(),
                ...message
            });
        })

        socket.on('updateJSON', (message: LottieJSONPayload) => {
            fastify.log.info("Updating existing UUID", message.uuid);

            Lottie.updateOne(
                { uuid: message.uuid }, // Filter
                {
                    $set: {
                        last_modified: new Date(),
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
