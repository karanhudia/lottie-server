import { createSchema } from 'graphql-yoga';
import { Lottie } from '../models/lottie';
import path from 'node:path';
import { importSchema } from 'graphql-import';
import { GraphQLError } from 'graphql/error';

const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      lottie: async (_, _args: { uuid: string }) => {
        const foundLottie = await Lottie.findOne({ uuid: _args.uuid });

        if (!foundLottie) {
          console.error('Error fetching GraphQL');

          throw new GraphQLError('UUID does not exists!', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }

        return foundLottie;
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
