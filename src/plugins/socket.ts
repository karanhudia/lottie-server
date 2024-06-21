import { FastifyPluginAsync } from 'fastify';
import fastifyIO from 'fastify-socket.io';
import { Server } from 'socket.io';

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

export const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>();

declare module 'fastify' {
    interface FastifyInstance {
        io: typeof io;
    }
}

export const fastifySocketIo: FastifyPluginAsync = async (fastify) => {
    await fastify.register(fastifyIO);

    fastify.io.on('connection', (socket: any) => {
        fastify.log.info('Socket connected!', socket.id);
        socket.emit('details', 'Please');
        socket.on('details', (message: string) => {
            console.log('Received:', message);
        });
    });

    fastify.addHook('onReady', async () => {
        fastify.log.info('WebSocket server ready');
    });
};
