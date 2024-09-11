import { statelessSessions } from "@keystone-6/core/session";

export const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.SESSION_SECRET,
});
