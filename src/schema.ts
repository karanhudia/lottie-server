import { createSchema } from "graphql-yoga";
import { Lottie } from "./models/lottieModel";

export const schema = createSchema({
    typeDefs: /* GraphQL */ `
        scalar File
        scalar Date
        scalar JSON

        type Lottie {
            createdAt: Date!
            updatedAt: Date!
            uuid: String!
            json: JSON!
        }

        type Query {
            lottie(uuid: ID!): Lottie
        }
    `,
    resolvers: {
        Query: {
            lottie: async (_, _args, context) => {
                const foundLottie = await Lottie.findOne({ uuid: _args.uuid });

                if (!foundLottie) {
                    return null;
                }

                return foundLottie
            },
        },
    },
});
