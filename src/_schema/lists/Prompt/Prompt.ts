import { list } from "@keystone-6/core";
import { text, timestamp, select } from "@keystone-6/core/fields";
import { LANGUAGE_OPTIONS } from "../lists.const";
import { access } from "./access";

export const Prompt = list({
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
