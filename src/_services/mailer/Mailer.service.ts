import { createTransport, SendMailOptions, SentMessageInfo } from "nodemailer";

/**
 * Mailer Service
 */
export class Mailer {
  public static email = process.env.GMAIL_EMAIL;

  private static transporter = createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  /**
   * content
   * @param {SendMailOptions} options Send Mail Options
   * @return {SentMessageInfo} SentMessageInfo
   */
  public static sendMail = (
    options: SendMailOptions
  ): Promise<SentMessageInfo> => {
    return this.transporter.sendMail(options);
  };
}
