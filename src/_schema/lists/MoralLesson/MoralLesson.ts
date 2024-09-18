import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, select, checkbox } from "@keystone-6/core/fields";
import { LANGUAGE_OPTIONS } from "../lists.const";

export const MoralLesson = list({
  access: allowAll,
  fields: {
    title: text({
      validation: {
        isRequired: true,
      },
    }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
      validation: {
        isRequired: true,
      },
    }),
    language: select({
      type: "enum",
      options: LANGUAGE_OPTIONS,
      validation: {
        isRequired: true,
      },
    }),
    isPublished: checkbox(),
    createdAt: timestamp({
      ui: {
        createView: {
          fieldMode: "hidden",
        },
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
