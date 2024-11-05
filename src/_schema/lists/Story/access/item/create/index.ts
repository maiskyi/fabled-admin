import { ListAccessControl } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { PartialDeep } from "type-fest";
import { DTO, listSubscriptions } from "../../../../../../_network/revenuecat";

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

      const customerId = context.req?.headers["rc-user-id"] as string;

      const { items: subscriptions } = await listSubscriptions(
        process.env.REVENUECAT_PROJECT_ID,
        customerId
      );

      const hasActiveSubscription = subscriptions.some(
        ({ status }) => status === DTO.SubscriptionStatus.active
      );

      return hasActiveSubscription;
    },
  },
};
