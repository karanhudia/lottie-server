import { FastifyInstance } from 'fastify';
import { mainController } from '../controllers/mainController';

export const registerRoutes = (fastify: FastifyInstance) => {
    fastify.get('/', mainController.handleRoot);
    fastify.get('/hello', mainController.handleHello);

    fastify.log.info('Main routes registered');
};
