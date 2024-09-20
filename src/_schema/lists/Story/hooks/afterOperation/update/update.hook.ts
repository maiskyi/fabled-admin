import { ListHooks } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { pubsub } from "../../../../../../_pubsub";

export const update: ListHooks<Lists.Story.TypeInfo> = {
  afterOperation: {
    update: ({ item, context }) => {
      (async () => {
        pubsub.publish(item.id, {
          storyUpdated: item,
        });

        const count = await context.db.Story.count({
          where: {
            isReady: {
              equals: true,
            },
            firebaseUserId: {
              equals: item.firebaseUserId,
            },
          },
        });

        pubsub.publish(item.firebaseUserId, {
          userStoriesCountUpdated: count,
        });
      })();
    },
  },
};
