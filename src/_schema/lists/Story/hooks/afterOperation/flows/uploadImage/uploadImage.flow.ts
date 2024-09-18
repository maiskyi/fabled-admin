import fs from "fs";
import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import Upload from "graphql-upload/Upload.js";
import { UploadImageInput } from "./uploadImage.types";

export const uploadImage = ({ url }: UploadImageInput) => {
  const filePath = path.resolve(__dirname, "./test.png");
  const filename = path.basename(filePath);

  const upload = new Upload();

  upload.resolve({
    createReadStream: () => fs.createReadStream(filePath),
    filename,
    mimetype: "image/png",
    encoding: "utf-8",
  });

  return upload;
};
