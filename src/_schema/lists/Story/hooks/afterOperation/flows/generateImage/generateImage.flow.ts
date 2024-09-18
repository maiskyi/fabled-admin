import OpenAI from "openai";
import { render } from "micromustache";
import { get } from "lodash";
import { StoryExceptionCode } from "../../../../Story.types";
import { StoryException } from "../../services/StoryException";
import { GenerateImageInput } from "./generateImage.types";

export const generateImage = async ({
  title,
  prompt: text,
}: GenerateImageInput) => {
  try {
    const client = new OpenAI();

    const prompt = render(
      text,
      {
        title,
      },
      {
        tags: ["*=", "=*"],
      }
    );

    const response = await client.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      model: "dall-e-3",
      quality: "standard",
      response_format: "url",
    });

    const url = get(response, ["data", 0, "url"]);

    if (url) {
      return { url };
    } else {
      throw new StoryException({
        message: "Fable image generation failed with no result",
        code: StoryExceptionCode.StoryImageGenerationFailedWithNoResult,
      });
    }
  } catch (error) {
    if (error instanceof StoryException) throw error;
    throw new StoryException({
      reason: get(error, "message"),
      message: "Fable image generation failed",
      code: StoryExceptionCode.StoryImageGenerationFailed,
    });
  }
};
