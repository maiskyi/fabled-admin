import { list } from "@keystone-6/core";
import { text, password, timestamp, checkbox } from "@keystone-6/core/fields";
import { access } from "./access";

export const User = list({
  access,
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
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
