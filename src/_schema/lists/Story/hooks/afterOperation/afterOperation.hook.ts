import { ListHooks } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { get } from "lodash";
import { StoryExceptionCode } from "../../Story.types";
import { pubsub, PubSubTrigger } from "../../../../../_pubsub";
import { StoryStatus } from "./services/StoryStatus";
import { StoryException } from "./services/StoryException";
import { generateContent } from "./flows/generateContent";
import { generateImage } from "./flows/generateImage";
import { uploadImage } from "./flows/uploadImage";

export const afterOperation: ListHooks<Lists.Story.TypeInfo> = {
  afterOperation: {
    create: ({ item, context }) => {
      (async () => {
        try {
          const status = new StoryStatus();

          await context.db.Story.updateOne({
            where: { id: item.id },
            data: {
              status: status.next("contentInProgress").value,
            },
          });

          const content = await generateContent({
            prompt: item.contentPrompt,
          });

          await context.db.Story.updateOne({
            where: { id: item.id },
            data: {
              ...content,
              status: status.next("imageInProgress").value,
            },
          });

          const image = await generateImage({
            title: content.title,
            prompt: item.imagePrompt,
          });

          const upload = uploadImage(image);

          await context.db.Story.updateOne({
            where: { id: item.id },
            data: {
              image: upload,
              isReady: true,
              status: status.next("success").value,
            },
          });
        } catch (error) {
          const exception = (() => {
            if (error instanceof StoryException) return error;
            return new StoryException({
              message: "Fable generation failed",
              code: StoryExceptionCode.StoryGenerationFailed,
              reason: get(error, "message"),
            });
          })();

          // eslint-disable-next-line no-console
          console.error(exception);
        }
      })();
    },
    update: ({ item }) => {
      pubsub.publish(`${PubSubTrigger.StoryUpdated}-${item.id}`, {
        storyUpdated: item,
      });
    },
  },
};
