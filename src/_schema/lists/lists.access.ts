import { BaseListTypeInfo, ListAccessControl } from "@keystone-6/core/types";
import { merge } from "lodash";
import { PartialDeep } from "type-fest";

export const access = <T extends BaseListTypeInfo>(
  params: PartialDeep<ListAccessControl<T>> = {}
): ListAccessControl<T> => {
  return merge<ListAccessControl<T>, PartialDeep<ListAccessControl<T>>>(
    {
      operation: {
        create: ({ session }) => !!session?.data?.isAdmin,
        delete: ({ session }) => !!session?.data?.isAdmin,
        query: () => true,
        update: ({ session }) => !!session?.data?.isAdmin,
      },
    },
    params
  );
};
