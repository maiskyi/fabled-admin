import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
  });
