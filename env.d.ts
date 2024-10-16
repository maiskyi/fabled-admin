declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      CLOUDINARY_CLOUD_NAME: string;
      DATABASE_PROVIDER: "sqlite" | "postgresql" | "mysql";
      DATABASE_URL: string;
      GMAIL_EMAIL: string;
      GMAIL_PASSWORD: string;
      MAILER_FROM: string;
      MAILER_TO: string;
      NODE_ENV: "development" | "production";
      SERVER_CORS_ORIGINS: string;
      SESSION_SECRET: string;
    }
  }
}

export {};
