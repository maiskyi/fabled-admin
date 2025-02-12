import { config } from "@keystone-6/core";

import { get } from "lodash";
import { lists, extendGraphqlSchema } from "./src/_schema";
import { withAuth, session } from "./src/_auth";
import { Logger } from "./src/_services";

Logger.init({
  dsn: process.env.SENTRY_DNS,
  environment: process.env.APP_ENVIRONMENT,
});

const origin = get(process.env, "SERVER_CORS_ORIGINS", "")
  .split(",")
  .map((v) => v.trim())
  .filter((v) => !!v);

export default withAuth(
  config({
    storage: {
      lullabies: {
        kind: "s3",
        type: "file",
        bucketName: process.env.AWS_S3_BUCKET_NAME,
        region: process.env.AWS_S3_BUCKET_REGION,
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
        signed: {
          expiry: 5000,
        },
      },
    },
    server: {
      cors: {
        origin,
      },
      extendExpressApp: (app) => {
        app.get("/api/health-check", (_, res) => {
          res.status(200).send("Ok");
        });
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
