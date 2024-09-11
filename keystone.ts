import { config } from "@keystone-6/core";

import { lists } from "./src/_schema";
import { withAuth, session } from "./src/_auth";

export default withAuth(
  config({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    lists,
    session,
  })
);
