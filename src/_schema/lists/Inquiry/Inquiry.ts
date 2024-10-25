import { list } from "@keystone-6/core";
import { text, timestamp } from "@keystone-6/core/fields";
import { hooks } from "./hooks";
import { access } from "./access";

export const Inquiry = list({
  access,
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
  hooks: hooks,
});
