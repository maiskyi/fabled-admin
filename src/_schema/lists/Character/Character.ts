import { list } from "@keystone-6/core";
import { text, timestamp, select, checkbox } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { allowAll } from "@keystone-6/core/access";
import { LANGUAGE_OPTIONS } from "../lists.const";
import { Session } from "../lists.types";

export const Character = list<Lists.Character.TypeInfo<Session>>({
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
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        folder: `${process.env.CLOUDINARY_FOLDER_ROOT}/characters`,
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
