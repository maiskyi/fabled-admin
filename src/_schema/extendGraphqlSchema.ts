import { GraphQLString, GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import { pubsub } from "../_pubsub";
import { StoryUpdatedArgs } from "./extendGraphqlSchema.types";

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
          args: {
            id: {
              type: GraphQLString,
            },
          },
          subscribe: (_, args: StoryUpdatedArgs) => {
            return pubsub.asyncIterator(args.id);
          },
        },
      },
    },
  });
