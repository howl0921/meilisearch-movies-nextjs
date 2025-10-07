declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MEILISEARCH_API_URL?: string;
      MEILISEARCH_API_KEY?: string;
      NODE_ENV?: "development" | "production" | "test";
    }
  }
}

export {};
