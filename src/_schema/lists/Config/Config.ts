import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { access } from "./access";

export const Config = list({
  isSingleton: true,
  access,
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
  },
});
