import { FastifyRequest, FastifyReply } from 'fastify';

export const mainController = {
    handleRoot: (req: FastifyRequest, reply: FastifyReply) => {
        // @ts-ignore
        req.server.io.emit('hello');
        reply.send({ message: 'Hello, World!' });
    },

    handleHello: async (req: FastifyRequest, reply: FastifyReply) => {
        reply.send({ hello: 'world' });
    },
};
