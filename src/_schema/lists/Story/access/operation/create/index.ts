import { ListAccessControl } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { PartialDeep } from "type-fest";
import { Session } from "../../../../lists.types";
import { Auth } from "../../../../../../_firebase";

export const create: PartialDeep<
  ListAccessControl<Lists.Story.TypeInfo<Session>>
> = {
  operation: {
    create: async ({ session, context }) => {
      if (session?.data?.isAdmin) return true;

      const authorization = context.req?.headers.authorization;

      const { uid } = await Auth.verifyIdToken(authorization);

      return !!uid;
    },
  },
};
