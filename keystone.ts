import { config } from "@keystone-6/core";

import { lists, extendGraphqlSchema } from "./src/_schema";
import { withAuth, session } from "./src/_auth";
import { extendHttpServer } from "./src/_server";
import { Logger } from "./src/_services";

Logger.init({
  dsn: process.env.SENTRY_DNS,
  environment: process.env.APP_ENVIRONMENT,
});

export default withAuth(
  config({
    server: {
      extendHttpServer,
      cors: {
        origin: (process.env.SERVER_CORS_ORIGINS || "")
          .split(",")
          .map((v) => v.trim())
          .filter((v) => !!v),
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
