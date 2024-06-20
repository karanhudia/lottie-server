import { FastifyPluginAsync } from 'fastify';
import mongodb from '@fastify/mongodb';

export const fastifyMongoDb: FastifyPluginAsync = async (fastify) => {
    fastify.register(mongodb, {
        forceClose: true,
        url: process.env.MONGODB_URI,
    });

    // fastify.mongo.client.db('sample_mflix').listCollections().toArray().then((response) => {
    //    console.log(response);
    // })
};
