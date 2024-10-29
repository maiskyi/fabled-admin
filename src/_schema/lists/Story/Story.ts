import { list } from "@keystone-6/core";
import {
  text,
  multiselect,
  timestamp,
  select,
  relationship,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import {
  READ_TIME_OPTIONS,
  STATUS_LOG_OPTIONS,
  STATUS_OPTIONS,
} from "./Story.const";
import { StoryStatusLog, StoryStatus } from "./Story.types";
import { hooks } from "./hooks";
import { access } from "./access";

export const Story = list({
  access,
  ui: {
    // hideCreate: true,
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
    prompt: relationship({
      ref: "Prompt",
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    character: relationship({
      ref: "Character",
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    placeOfEvent: relationship({
      ref: "PlaceOfEvent",
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    moralLesson: relationship({
      ref: "MoralLesson",
      ui: {
        itemView: {
          fieldMode: "read",
        },
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
    statusLog: multiselect({
      type: "enum",
      defaultValue: [StoryStatusLog.Initialized],
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
      },
      options: STATUS_LOG_OPTIONS,
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
