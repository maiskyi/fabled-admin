import { ListHooks } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { get } from "lodash";
import { StoryExceptionCode } from "../../../Story.types";
import { Logger } from "../../../../../../_services";
import { StoryException } from "./services/StoryException";
import { StoryStatusLog } from "./services/StoryStatus";
import { generateContent } from "./flows/generateContent";
import { generateImage } from "./flows/generateImage";
import { uploadImage } from "./flows/uploadImage";

export const create: ListHooks<Lists.Story.TypeInfo> = {
  afterOperation: {
    create: ({ item, context }) => {
      (async () => {
        const statusLog = new StoryStatusLog();

        try {
          await context.db.Story.updateOne({
            where: { id: item.id },
            data: {
              statusLog: statusLog.next("contentInProgress").value,
            },
          });

          const content = await (async () => {
            if (!item.title && !item.content) {
              Logger.info("Story content in progress", { id: item.id });

              const { title, content, description } = await generateContent({
                prompt: item.contentPrompt,
              });

              Logger.info("Story content generated", { id: item.id });

              return { title, content, description };
            }
            return {
              title: item.title,
              content: item.content,
              description: "",
            };
          })();

          await context.db.Story.updateOne({
            where: { id: item.id },
            data: {
              title: content.title,
              content: content.content,
              statusLog: statusLog.next("imageInProgress").value,
            },
          });

          if (!item.image) {
            Logger.info("Story image in progress", { id: item.id });

            const image = await generateImage({
              title: content.title,
              prompt: item.imagePrompt,
              description: content?.description,
            });

            Logger.info("Story image generated", { id: item.id });

            const upload = uploadImage(image);

            await context.db.Story.updateOne({
              where: { id: item.id },
              data: {
                image: upload,
              },
            });

            Logger.info("Story created", { id: item.id });
          }

          await context.db.Story.updateOne({
            where: { id: item.id },
            data: {
              status: "success",
              statusLog: statusLog.next("success").value,
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

          await context.db.Story.updateOne({
            where: { id: item.id },
            data: {
              status: "failed",
              statusLog: statusLog.next(exception.code).value,
            },
          });

          Logger.error("Story creation failed", exception);
        }
      })();
    },
  },
};
