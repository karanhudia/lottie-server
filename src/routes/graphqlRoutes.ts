import {FastifyInstance} from 'fastify';
import {createYoga} from 'graphql-yoga';
import {schema} from '../schema';

export const registerGraphQLRoutes = (fastify: FastifyInstance) => {
    const yoga = createYoga({
        schema,
        logging: {
            debug: (...args) => args.forEach(arg => fastify.log.debug(arg)),
            info: (...args) => args.forEach(arg => fastify.log.info(arg)),
            warn: (...args) => args.forEach(arg => fastify.log.warn(arg)),
            error: (...args) => args.forEach(arg => fastify.log.error(arg)),
        },
    });

    fastify.route({
        url: yoga.graphqlEndpoint,
        method: ['GET', 'POST', 'OPTIONS'],
        handler: async (req, reply) => {
            const response = await yoga.handleNodeRequestAndResponse(req, reply, {
                req,
                reply,
            });
            response.headers.forEach((value, key) => {
                reply.header(key, value);
            });

            reply.status(response.status);
            reply.send(response.body);

            return reply;
        },
    });

    fastify.addContentTypeParser('multipart/form-data', {}, (req, payload, done) => done(null));

    fastify.log.info('GraphQL routes registered');
};
