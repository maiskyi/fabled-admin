import { list } from "@keystone-6/core";
import { text, timestamp, select, checkbox } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { LANGUAGE_OPTIONS } from "../lists.const";
import { access } from "./access";

export const PlaceOfEvent = list({
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
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        folder: `${process.env.CLOUDINARY_FOLDER_ROOT}/place-of-event`,
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
