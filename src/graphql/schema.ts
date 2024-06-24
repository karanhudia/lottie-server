import { createSchema } from 'graphql-yoga';
import { Lottie } from '../models/lottie';
import path from 'node:path';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      lottie: async (_, _args: { uuid: string }) => {
        try {
          const foundLottie = await Lottie.findOne({ uuid: _args.uuid });

          if (!foundLottie) {
            return null;
          }

          return foundLottie;
        } catch (error) {
          console.error('Error fetching GraphQL');

          return {
            code: 404,
            status: 'Could not find JSON',
          };
        }
      },
    },
    Mutation: {
      createLottie: async (_, _args: { uuid: string; json: JSON }) => {
        try {
          await Lottie.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            uuid: _args.uuid,
            json: _args.json,
          });

          return {
            code: 200,
            status: 'ok',
          };
        } catch (error) {
          console.error('Error fetching GraphQL');

          return {
            code: 500,
            status: 'Could not create new JSON',
          };
        }
      },
    },
  },
});
