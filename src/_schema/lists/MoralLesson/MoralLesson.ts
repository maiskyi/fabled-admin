import { list } from "@keystone-6/core";
import { text, timestamp, select, checkbox } from "@keystone-6/core/fields";
import { LANGUAGE_OPTIONS } from "../lists.const";
import { access } from "./access";

export const MoralLesson = list({
  access,
  ui: {
    listView: {
      initialColumns: ["title", "language"],
    },
  },
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
