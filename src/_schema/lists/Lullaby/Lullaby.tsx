// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { checkbox, file, text, timestamp } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { Session } from "../lists.types";

export const Lullaby = list<Lists.Config.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    isHidden: ({ session }) => {
      return !session?.data?.isAdmin;
    },
  },
  fields: {
    title: text({
      validation: {
        isRequired: true,
      },
    }),
    mp3: file({ storage: "lullabies" }),
    isPublished: checkbox(),
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
