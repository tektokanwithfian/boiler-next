import { Firestore } from '@google-cloud/firestore'
import type { Settings } from '@google-cloud/firestore'

const settings = {
  databaseId: '',
  ignoreUndefinedProperties: true,
} as Settings

if (process.env.FIRESTORE_DB_NAME !== '') {
  settings.databaseId = process.env.FIRESTORE_DB_NAME
}

export const firestore = new Firestore(settings)

const client = {
  firestore,
}

export default client
