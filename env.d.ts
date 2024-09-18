declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      SESSION_SECRET: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      CLOUDINARY_CLOUD_NAME: string;
      SERVER_CORS_ORIGINS: string;
      GMAIL_EMAIL: string;
      GMAIL_PASSWORD: string;
      MAILER_FROM: string;
      MAILER_TO: string;
    }
  }
}

export {};
