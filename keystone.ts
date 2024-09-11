import { config } from "@keystone-6/core";

import { lists } from "./src/_schema";
import { withAuth, session } from "./src/_auth";

export default withAuth(
  config({
    server: {
      cors: { origin: ["http://localhost:5173"] },
    },
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    lists,
    session,
  })
);
