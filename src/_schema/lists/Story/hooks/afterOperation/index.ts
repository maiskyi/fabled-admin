import { merge } from "lodash";
import { create } from "./create";

const { afterOperation } = merge(create);

export { afterOperation };
