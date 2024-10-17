import { config } from "@keystone-6/core";

import { lists, extendGraphqlSchema } from "./src/_schema";
import { withAuth, session } from "./src/_auth";
import { extendHttpServer } from "./src/_server";

const SERVER_CORS_ORIGINS = process.env.SERVER_CORS_ORIGINS || "";

export default withAuth(
  config({
    server: {
      extendHttpServer,
      cors: {
        origin: SERVER_CORS_ORIGINS.split(",")
          .map((v) => v.trim())
          .filter((v) => !!v)
          .concat(["capacitor://localhost"]),
      },
    },
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL,
    },
    graphql: {
      extendGraphqlSchema,
    },
    lists,
    session,
  })
);
