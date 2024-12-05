// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { text, password, timestamp, checkbox } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { Session } from "../lists.types";

export const User = list<Lists.User.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    isHidden: ({ session }) => {
      return !session?.data?.isAdmin;
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox({
      defaultValue: true,
    }),
    firebaseUserId: text({
      defaultValue: "",
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
