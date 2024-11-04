import { ListAccessControl } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { PartialDeep } from "type-fest";
import { merge } from "lodash";
import { create } from "./create";
import { update } from "./update";

export const operation: PartialDeep<ListAccessControl<Lists.Story.TypeInfo>> =
  merge(create, update);
