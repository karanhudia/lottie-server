import { FastifyRequest, FastifyReply } from 'fastify';

export const mainController = {
  handleRoot: (req: FastifyRequest, reply: FastifyReply) => {
    // @ts-ignore
    req.server.io.emit('hello');
    reply.send({ message: 'Hello, World!' });
  },

  handleHealth: async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ status: 'ok' });
  },
};
