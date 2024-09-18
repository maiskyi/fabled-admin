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
import { hooks } from "./hooks";

export const Story = list({
  access: allowAll,
  ui: {
    hideCreate: true,
  },
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
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    content: text({
      isIndexed: true,
      ui: {
        displayMode: "textarea",
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "hidden",
        },
      },
    }),
    image: cloudinaryImage({
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
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
      ui: {
        itemView: {
          fieldMode: "read",
        },
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
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    imagePrompt: text({
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: "textarea",
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    message: text({
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: "textarea",
        itemView: {
          fieldMode: "read",
        },
      },
    }),
  },
  hooks: hooks,
});
