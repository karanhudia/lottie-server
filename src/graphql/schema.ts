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
          console.log('Error fetching GraphQL');
        }
      },
    },
  },
});
