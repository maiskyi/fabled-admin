// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { access as get } from "../../lists.access";
import { operation } from "./operation";
import { item } from "./item";

export const access = get<Lists.Story.TypeInfo>({
  ...item,
  ...operation,
});
