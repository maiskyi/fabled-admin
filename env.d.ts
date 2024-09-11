declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      SESSION_SECRET: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      CLOUDINARY_CLOUD_NAME: string;
    }
  }
}

export {};
