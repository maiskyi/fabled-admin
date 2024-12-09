import OpenAI from "openai";
import { get } from "lodash";
import { StoryException } from "../../services/StoryException";
import { StoryExceptionCode } from "../../../../../Story.types";
import {
  GenerateContentInput,
  GenerateContentOutput,
} from "./generateContent.types";

export const generateContent = async ({
  prompt,
}: GenerateContentInput): Promise<GenerateContentOutput> => {
  try {
    const client = new OpenAI();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional writer of fairy tales for children",
        },
        {
          role: "user",
          content: prompt,
        },
        {
          role: "user",
          content: `
              Please provide the response in JSON format with the following fields:
              {
                "title": "string" // title of the fairy tail,
                "content": "string" // content of the fairy tail
                "illustration": "string" // fairy tail illustration detailed description
              }
            `,
        },
      ],
    });

    const result = get(completion, ["choices", 0, "message", "content"]);

    if (result) {
      const json = result.replace(/```json|```/g, "").trim();
      const { title, content, illustration } = JSON.parse(json);
      return { content, title, illustration };
    }

    throw new StoryException({
      message: "Fable content generation failed with no result",
      code: StoryExceptionCode.StoryContentGenerationFailedWithNoResult,
    });
  } catch (error) {
    if (error instanceof StoryException) throw error;
    throw new StoryException({
      reason: get(error, "message"),
      message: "Fable content generation failed",
      code: StoryExceptionCode.StoryContentGenerationFailed,
    });
  }
};
