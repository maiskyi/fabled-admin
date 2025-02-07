import { select } from "@keystone-6/core/fields";
import { LANGUAGE_OPTIONS } from "./language.const";

export const language = select({
  type: "enum",
  options: LANGUAGE_OPTIONS,
  validation: {
    isRequired: true,
  },
});
