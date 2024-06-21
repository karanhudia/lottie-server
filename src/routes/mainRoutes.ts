import { FastifyInstance } from 'fastify';
import { mainController } from '../controllers/mainController';

export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.get('/', mainController.handleRoot);
  fastify.get('/health', mainController.handleHealth);

  fastify.log.info('Main routes registered');
};
