import { ListAccessControl } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { PartialDeep } from "type-fest";

export const create: PartialDeep<ListAccessControl<Lists.Story.TypeInfo>> = {
  operation: {
    create: async () => true,
  },
};
