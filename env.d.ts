declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENVIRONMENT: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_FOLDER_ROOT: string;
      DATABASE_PROVIDER: "sqlite" | "postgresql" | "mysql";
      DATABASE_URL: string;
      GMAIL_EMAIL: string;
      GMAIL_PASSWORD: string;
      MAILER_FROM: string;
      MAILER_TO: string;
      NODE_ENV: "development" | "production";
      REVENUECAT_API_HOST: string;
      REVENUECAT_API_KEY: string;
      REVENUECAT_PROJECT_ID: string;
      SENTRY_DNS: string;
      SERVER_CORS_ORIGINS: string;
      SESSION_SECRET: string;
    }
  }
}

export {};
