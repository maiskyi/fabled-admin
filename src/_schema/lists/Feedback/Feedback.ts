import { list } from "@keystone-6/core";
import { text, timestamp, integer } from "@keystone-6/core/fields";
import { hooks } from "./hooks";
import { access } from "./access";

export const Feedback = list({
  access,
  ui: {
    hideCreate: true,
  },
  fields: {
    firebaseUserId: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
      validation: {
        isRequired: true,
      },
    }),
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
    rating: integer({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
      validation: {
        isRequired: true,
        min: 0,
        max: 5,
      },
    }),
    comment: text({
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
