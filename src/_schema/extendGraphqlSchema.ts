import type { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import { pubsub, PubSubTrigger } from "../_pubsub";

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: `
      type Subscription {
        storyUpdated(id: ID): Story
      }
    `,
    resolvers: {
      Subscription: {
        storyUpdated: {
          subscribe: () => pubsub.asyncIterator([PubSubTrigger.StoryUpdated]),
        },
      },
    },
  });
