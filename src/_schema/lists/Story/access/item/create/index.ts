import { ListAccessControl } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { PartialDeep } from "type-fest";

export const create: PartialDeep<ListAccessControl<Lists.Story.TypeInfo>> = {
  item: {
    create: async ({ session, context, inputData }) => {
      if (session?.data?.isAdmin) return true;

      const successCount = await context.db.Story.count({
        where: {
          firebaseUserId: { equals: inputData.firebaseUserId },
          status: {
            equals: "success",
          },
        },
      });

      const inProgressCount = await context.db.Story.count({
        where: {
          firebaseUserId: { equals: inputData.firebaseUserId },
          status: {
            equals: "inprogress",
          },
        },
      });

      if (successCount < 3 && inProgressCount === 0) return true;

      return false;
    },
  },
};
