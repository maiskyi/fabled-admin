// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { select, text } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { Session } from "../lists.types";

export const Config = list<Lists.Config.TypeInfo<Session>>({
  isSingleton: true,
  access: allowAll,
  ui: {
    isHidden: ({ session }) => {
      return !session?.data?.isAdmin;
    },
  },
  fields: {
    privacyPolicyUrl: text({
      validation: {
        isRequired: true,
      },
    }),
    termsAndConditionsUrl: text({
      validation: {
        isRequired: true,
      },
    }),
    migration1: select({
      type: "integer",
      options: [],
    }),
  },
});
