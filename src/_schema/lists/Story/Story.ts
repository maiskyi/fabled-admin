import { list } from "@keystone-6/core";
import {
  text,
  multiselect,
  timestamp,
  select,
  relationship,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { allowAll } from "@keystone-6/core/access";
import {
  READ_TIME_OPTIONS,
  STATUS_LOG_OPTIONS,
  STATUS_OPTIONS,
} from "./Story.const";
import { StoryStatusLog, StoryStatus } from "./Story.types";
import { hooks } from "./hooks";

export const Story = list({
  access: allowAll,
  ui: {
    listView: {
      initialColumns: ["title"],
    },
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
    deviceId: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    parent: relationship({
      ref: "Story",
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    prompt: relationship({
      ref: "Prompt",
      ui: {
        hideCreate: true,
      },
    }),
    character: relationship({
      ref: "Character",
      ui: {
        hideCreate: true,
      },
    }),
    placeOfEvent: relationship({
      ref: "PlaceOfEvent",
      ui: {
        hideCreate: true,
      },
    }),
    moralLesson: relationship({
      ref: "MoralLesson",
      ui: {
        hideCreate: true,
      },
    }),
    title: text({
      isIndexed: true,
    }),
    content: text({
      ui: {
        displayMode: "textarea",
        listView: {
          fieldMode: "hidden",
        },
      },
    }),
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        folder: `${process.env.CLOUDINARY_FOLDER_ROOT}/stories`,
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
    status: select({
      type: "enum",
      defaultValue: StoryStatus.InProgress,
      options: STATUS_OPTIONS,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    statusLog: multiselect({
      type: "enum",
      defaultValue: [StoryStatusLog.Initialized],
      options: STATUS_LOG_OPTIONS,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    contentPrompt: text({
      defaultValue: "contentPrompt",
      ui: {
        displayMode: "textarea",
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    imagePrompt: text({
      defaultValue: "imagePrompt",
      ui: {
        displayMode: "textarea",
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
    message: text({
      defaultValue: "message",
      ui: {
        displayMode: "textarea",
        createView: {
          fieldMode: "hidden",
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
  },
  hooks: hooks,
});
