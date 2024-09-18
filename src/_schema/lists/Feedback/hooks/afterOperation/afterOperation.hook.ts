import { ListHooks } from "@keystone-6/core/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Lists } from ".keystone/types";
import { Mailer } from "../../../../../_services/mailer";

export const afterOperation: ListHooks<Lists.Feedback.TypeInfo> = {
  afterOperation: {
    create: ({ item }) => {
      (async () => {
        try {
          await Mailer.sendMail({
            from: item.email,
            to: process.env.MAILER_TO,
            subject: `[Fabled][Feedback] ${item.email}`,
            text: `
              From: ${item.email}
      
              Message: ${item.comment}
            `,
          });
          return false;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      })();
    },
  },
};
