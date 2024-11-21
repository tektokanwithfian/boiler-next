import { Storage } from '@google-cloud/storage'

export const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

const client = {
  storage,
}
export default client
