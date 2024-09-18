import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, select, checkbox } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { LANGUAGE_OPTIONS } from "../lists.const";

export const Character = list({
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
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        folder: "character",
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
