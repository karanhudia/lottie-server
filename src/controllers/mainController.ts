import { FastifyRequest, FastifyReply } from 'fastify';

export const mainController = {
  handleRoot: (req: FastifyRequest, reply: FastifyReply) => {
    void reply.send({ message: 'Websockets connected' });
  },

  handleHealth: (_req: FastifyRequest, reply: FastifyReply) => {
    void reply.send({ status: 'ok' });
  },
};
