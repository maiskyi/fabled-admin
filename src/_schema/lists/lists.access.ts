import { BaseListTypeInfo, ListAccessControl } from "@keystone-6/core/types";

export const access = <T extends BaseListTypeInfo>(): ListAccessControl<T> => {
  return {
    operation: {
      create: ({ session }) => !!session,
      delete: ({ session }) => !!session,
      query: () => true,
      update: ({ session }) => !!session,
    },
  };
};
