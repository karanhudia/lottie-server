import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifySocketIo } from './plugins/socket';
import { fastifyMongoDb } from './plugins/db';
import { registerRoutes } from './routes/mainRoutes';

const start = async () => {
    const fastify = Fastify();

    // CORS policy
    await fastify.register(cors, {
        origin: true,
    });

    console.info("CORS registered");

    await fastify.register(fastifyMongoDb);
    await fastify.register(fastifySocketIo);

    console.info("Plugins registered");

    registerRoutes(fastify);

    console.info("Routes registered");

    try {
        await fastify.listen({ port: process.env.PORT ?? 4000, host: '127.0.0.1' });
        console.log(`Server started on ${JSON.stringify(fastify.server.address())}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
