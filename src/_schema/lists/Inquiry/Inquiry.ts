import { list } from "@keystone-6/core";
import { text, timestamp } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const Inquiry = list({
  access: allowAll,
  ui: {
    hideCreate: true,
  },
  fields: {
    email: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
      validation: {
        isRequired: true,
      },
    }),
    subject: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
      validation: {
        isRequired: true,
      },
    }),
    message: text({
      ui: {
        displayMode: "textarea",
        itemView: {
          fieldMode: "read",
        },
      },
      validation: {
        isRequired: true,
      },
    }),
    createdAt: timestamp({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
      defaultValue: {
        kind: "now",
      },
    }),
  },
});
