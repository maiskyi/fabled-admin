import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  multiselect,
  timestamp,
  checkbox,
  select,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { READ_TIME_OPTIONS, STATUS_OPTIONS } from "./Story.const";

export const Story = list({
  access: allowAll,
  fields: {
    firebaseUserId: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
      validation: {
        isRequired: true,
      },
    }),
    title: text({
      isIndexed: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    image: cloudinaryImage({
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        folder: "stories",
      },
    }),
    readTime: select({
      type: "integer",
      options: READ_TIME_OPTIONS,
      validation: {
        isRequired: true,
      },
    }),
    status: multiselect({
      type: "enum",
      defaultValue: ["initialized"],
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
      },
      options: STATUS_OPTIONS,
    }),
    isReady: checkbox({
      defaultValue: false,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
      },
    }),
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
    contentPrompt: text({
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: "textarea",
      },
    }),
    imagePrompt: text({
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: "textarea",
      },
    }),
    message: text({
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: "textarea",
      },
    }),
  },
});
