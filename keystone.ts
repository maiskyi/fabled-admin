import { config } from "@keystone-6/core";

import { lists, extendGraphqlSchema } from "./src/_schema";
import { withAuth, session } from "./src/_auth";
import { extendHttpServer } from "./src/_server";

export default withAuth(
  config({
    server: {
      extendHttpServer,
      cors: {
        origin: process.env.SERVER_CORS_ORIGINS.split(",")
          .map((v) => v.trim())
          .filter((v) => !!v),
      },
    },
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    graphql: {
      extendGraphqlSchema,
    },
    lists,
    session,
  })
);
