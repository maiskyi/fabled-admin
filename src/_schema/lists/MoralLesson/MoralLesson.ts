// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { text, timestamp, select, checkbox } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { LANGUAGE_OPTIONS } from "../lists.const";
import { Session } from "../lists.types";

export const MoralLesson = list<Lists.MoralLesson.TypeInfo<Session>>({
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
    emoji: text({
      defaultValue: "",
      validation: {
        isRequired: true,
      },
      isFilterable: false,
      isOrderable: false,
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
