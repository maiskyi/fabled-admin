import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, select } from "@keystone-6/core/fields";
import { LANGUAGE_OPTIONS } from "../lists.const";

export const Prompt = list({
  access: allowAll,
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
    message: text({
      ui: {
        displayMode: "textarea",
        listView: {
          fieldMode: "hidden",
        },
      },
      validation: {
        isRequired: true,
      },
    }),
    textPrompt: text({
      ui: {
        displayMode: "textarea",
        listView: {
          fieldMode: "hidden",
        },
      },
      validation: {
        isRequired: true,
      },
    }),
    imagePrompt: text({
      ui: {
        displayMode: "textarea",
        listView: {
          fieldMode: "hidden",
        },
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
    createdAt: timestamp({
      ui: {
        itemView: {
          fieldMode: "read",
        },
        createView: {
          fieldMode: "hidden",
        },
      },
      defaultValue: {
        kind: "now",
      },
    }),
  },
});
