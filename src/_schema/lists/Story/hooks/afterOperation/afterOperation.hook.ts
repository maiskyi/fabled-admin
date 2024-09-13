import { ListHooks } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { StoryExceptionCode } from "../../Story.types";
import { StoryStatus } from "./services/StoryStatus";
import { generateContent } from "./flows/generateContent";
import { StoryException } from "./services/StoryException";

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

          const { title, content } = await generateContent({
            prompt: item.contentPrompt,
          });

          await context.db.Story.updateOne({
            where: { id: item.id },
            data: {
              title,
              content,
              status: status.next("imageInProgress").value,
            },
          });
        } catch (error) {
          const exception = (() => {
            if (error instanceof StoryException) return error;
            return new StoryException({
              message: "Fable generation failed",
              code: StoryExceptionCode.StoryGenerationFailed,
            });
          })();

          throw exception;
        }
      })();
    },
  },
};
