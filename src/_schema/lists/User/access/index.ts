// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { access as get } from "../../lists.access";

export const access = get<Lists.User.TypeInfo>({
  operation: {
    query: ({ session }) => {
      if (session) return true;
      throw new Error("Access denied");
    },
  },
});
