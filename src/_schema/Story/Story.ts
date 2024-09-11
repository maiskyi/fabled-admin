import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

export const Story = list({
  access: allowAll,
  fields: {
    uid: text({
      validation: {
        isRequired: true,
      },
    }),
    title: text({
      isIndexed: true,
    }),
  },
});
