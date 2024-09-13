import { StoryExceptionCode } from "../../../../Story.types";

export interface ExceptionParams {
  message: string;
  code: StoryExceptionCode;
  reason?: string;
}
