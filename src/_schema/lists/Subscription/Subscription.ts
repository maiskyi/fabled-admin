import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, select, text } from "@keystone-6/core/fields";
import { BILLING_PERIOD_OPTIONS } from "./Subscription.const";

export const Subscription = list({
  access: allowAll,
  fields: {
    title: text({
      validation: {
        isRequired: true,
      },
    }),
    billingPeriod: select({
      type: "enum",
      options: BILLING_PERIOD_OPTIONS,
      validation: {
        isRequired: true,
      },
    }),
    appleProductId: text({
      validation: {
        isRequired: true,
      },
    }),
    isActive: checkbox(),
  },
});
