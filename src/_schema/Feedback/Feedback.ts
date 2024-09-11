import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, integer } from "@keystone-6/core/fields";

export const Feedback = list({
  access: allowAll,
  fields: {
    rating: integer({
      validation: {
        isRequired: true,
        min: 0,
        max: 5,
      },
    }),
    comment: text({
      ui: {
        displayMode: "textarea",
      },
      validation: {
        isRequired: true,
      },
    }),
    createdAt: timestamp({
      defaultValue: {
        kind: "now",
      },
    }),
  },
});
