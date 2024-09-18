// @ts-expect-error Valid error
// eslint-disable-next-line import/no-extraneous-dependencies
import Upload from "graphql-upload/Upload.js";
import got from "got";
import { get } from "lodash";
import { StoryException } from "../../services/StoryException";
import { StoryExceptionCode } from "../../../../Story.types";
import { UploadImageInput } from "./uploadImage.types";

export const uploadImage = ({ url }: UploadImageInput) => {
  if (url) {
    try {
      const upload = new Upload();

      upload.resolve({
        createReadStream: () => got.stream(url),
      });

      return upload;
    } catch (error) {
      throw new StoryException({
        message: "Story image upload failed",
        code: StoryExceptionCode.StoryImageUploadFailed,
        reason: get(error, "message"),
      });
    }
  } else {
    throw new StoryException({
      message: "Story image upload failed. Image url is missing",
      code: StoryExceptionCode.StoryImageUploadFailed,
    });
  }
};
