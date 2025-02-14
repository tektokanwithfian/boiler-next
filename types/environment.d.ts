export namespace NodeJS {
  export interface ProcessEnv extends NodeJS.ProcessEnv {
    CLERK_SECRET_KEY: string
    FIRESTORE_DB_NAME: string
    GOOGLE_APPLICATION_CREDENTIALS: string
    GOOGLE_STORAGE_BUCKET_NAME: string
    GOOGLE_PROJECT_ID: string
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
    NODE_ENV: string
    TYPESENSE_API_KEY: string
    TYPESENSE_HOST: string
    TYPESENSE_PORT: string
  }
}
