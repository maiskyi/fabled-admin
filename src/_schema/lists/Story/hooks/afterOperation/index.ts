import { merge } from "lodash";
import { create } from "./create";
import { update } from "./update";

const { afterOperation } = merge(create, update);

export { afterOperation };
