import type { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import { get } from "lodash";
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
          subscribe: (_, args) => {
            return pubsub.asyncIterator(
              `${PubSubTrigger.StoryUpdated}-${get(args, "id")}`
            );
          },
        },
      },
    },
  });
