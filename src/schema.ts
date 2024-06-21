import {createSchema} from "graphql-yoga";

export const schema = createSchema({
    typeDefs: /* GraphQL */ `
        scalar File

        type Query {
          hello: String
        }
      `,
        resolvers: {
    Query: {
        hello: () => 'world',
            isFastify: (_, __, context) => !!context.request,
        },
    },
});
