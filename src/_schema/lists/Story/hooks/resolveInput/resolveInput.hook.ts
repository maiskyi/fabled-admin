import { ListHooks } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { render } from "micromustache";
import { merge } from "lodash";

export const resolveInput: ListHooks<Lists.Story.TypeInfo> = {
  resolveInput: async ({ context, resolvedData, operation }) => {
    if (operation === "create") {
      try {
        const prompt = await context.db.Prompt.findOne({
          where: {
            id: resolvedData.prompt?.connect?.id,
          },
        });

        const character = await context.db.Character.findOne({
          where: {
            id: resolvedData.character?.connect?.id,
          },
        });

        const moralLesson = await context.db.MoralLesson.findOne({
          where: {
            id: resolvedData.moralLesson?.connect?.id,
          },
        });

        const placeOfEvent = await context.db.PlaceOfEvent.findOne({
          where: {
            id: resolvedData.placeOfEvent?.connect?.id,
          },
        });

        const message = render(prompt?.message || "", {
          character: character?.title,
          description: moralLesson?.title,
          readTime: resolvedData.readTime,
          scene: placeOfEvent?.title,
        }).replace(/<\/?[^>]+(>|$)/g, "");

        const contentPrompt = render(prompt?.textPrompt || "", {
          character: character?.title,
          characterNote:
            character?.description && `(${character?.description})`,
          contentLength: (resolvedData.readTime || 0) * 150,
          description: moralLesson?.title,
          descriptionNote:
            moralLesson?.description && `(${moralLesson?.description})`,
          scene: placeOfEvent?.title,
        }).replace(/<\/?[^>]+(>|$)/g, "");

        const imagePrompt = render(prompt?.imagePrompt || "", {
          character: character?.title,
          characterNote:
            character?.description && `(${character?.description})`,
          scene: placeOfEvent?.title,
        }).replace(/<\/?[^>]+(>|$)/g, "");

        return merge({}, resolvedData, {
          message,
          contentPrompt,
          imagePrompt,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    return resolvedData;
  },
};
