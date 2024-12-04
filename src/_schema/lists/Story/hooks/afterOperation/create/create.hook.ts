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

              const content = await generateContent({
                prompt: item.contentPrompt,
              });

              Logger.info("Story content generated", { id: item.id });

              await context.db.Story.updateOne({
                where: { id: item.id },
                data: {
                  ...content,
                  statusLog: statusLog.next("imageInProgress").value,
                },
              });

              return content;
            }
            return {
              title: item.title,
              content: item.content,
            };
          })();

          if (!item.image) {
            Logger.info("Story image in progress", { id: item.id });

            const image = await generateImage({
              title: content.title,
              prompt: item.imagePrompt,
            });

            Logger.info("Story image generated", { id: item.id });

            const upload = uploadImage(image);

            await context.db.Story.updateOne({
              where: { id: item.id },
              data: {
                image: upload,
                status: "success",
                statusLog: statusLog.next("success").value,
              },
            });

            Logger.info("Story created", { id: item.id });
          }
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
