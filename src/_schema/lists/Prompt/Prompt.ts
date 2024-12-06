// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { text, timestamp, select } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { LANGUAGE_OPTIONS } from "../lists.const";
import { Session } from "../lists.types";

export const Prompt = list<Lists.Prompt.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    listView: {
      initialColumns: ["title", "language"],
    },
    itemView: {
      defaultFieldMode: ({ session }) => {
        if (session?.data?.isAdmin) {
          return "edit";
        }
        return "read";
      },
    },
    hideDelete: ({ session }) => {
      return !session?.data?.isAdmin;
    },
    hideCreate: ({ session }) => {
      return !session?.data?.isAdmin;
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
