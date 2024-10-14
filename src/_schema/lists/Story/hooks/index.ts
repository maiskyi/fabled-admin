import { afterOperation } from "./afterOperation";
import { resolveInput } from "./resolveInput";

export const hooks = {
  afterOperation,
  resolveInput: resolveInput.resolveInput,
};
