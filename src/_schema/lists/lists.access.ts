import { BaseListTypeInfo, ListAccessControl } from "@keystone-6/core/types";
import { merge } from "lodash";
import { PartialDeep } from "type-fest";

export const access = <T extends BaseListTypeInfo>(
  params: PartialDeep<ListAccessControl<T>> = {}
): ListAccessControl<T> => {
  return merge<ListAccessControl<T>, PartialDeep<ListAccessControl<T>>>(
    {
      operation: {
        create: ({ session }) => !!session,
        delete: ({ session }) => !!session,
        query: () => true,
        update: ({ session }) => !!session,
      },
    },
    params
  );
};
