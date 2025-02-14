import { Firestore } from '@google-cloud/firestore'
import type { Settings } from '@google-cloud/firestore'

const settings = {
  databaseId: process.env.FIRESTORE_DB_NAME || '',
  ignoreUndefinedProperties: true,
} as Settings

export const firestore = new Firestore(settings)

const client = {
  firestore,
}

export default client
