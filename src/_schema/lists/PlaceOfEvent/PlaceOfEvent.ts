// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import {
  text,
  timestamp,
  checkbox,
  relationship,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { allowAll } from "@keystone-6/core/access";
import { Session } from "../lists.types";
import { language } from "../_fields/language";

export const PlaceOfEvent = list<Lists.PlaceOfEvent.TypeInfo<Session>>({
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
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        folder: `${process.env.CLOUDINARY_FOLDER_ROOT}/place-of-event`,
      },
    }),
    prompt: relationship({
      ref: "Prompt",
      ui: {
        hideCreate: true,
      },
    }),
    // @ts-expect-error Correct
    language,
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
