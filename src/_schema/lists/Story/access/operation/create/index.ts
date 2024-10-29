import { ListAccessControl } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { PartialDeep } from "type-fest";
import { get } from "lodash";

export const create: PartialDeep<ListAccessControl<Lists.Story.TypeInfo>> = {
  operation: {
    create: async ({ session, context }) => {
      if (session?.data?.isAdmin) return true;

      const firebaseUserId = get(context, [
        "req",
        "body",
        "variables",
        "data",
        "firebaseUserId",
      ]);

      const count = await context.db.Story.count({
        where: {
          firebaseUserId: { equals: firebaseUserId },
          status: {
            equals: "success",
          },
        },
      });

      if (count < 3) return true;

      return false;
    },
  },
};
