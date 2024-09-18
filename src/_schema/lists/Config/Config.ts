import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

export const Config = list({
  isSingleton: true,
  access: allowAll,
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
