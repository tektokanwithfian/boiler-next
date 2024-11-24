import { Client } from 'typesense'

import type { ConfigurationOptions } from 'typesense/lib/Typesense/Configuration'

const {
  NODE_ENV, TYPESENSE_API_KEY, TYPESENSE_HOST, TYPESENSE_PORT,
} = process.env

const options = {
  nodes: [{
    host: TYPESENSE_HOST || 'localhost',
    port: TYPESENSE_PORT || 8108,
    protocol: 'http',
  }],
  apiKey: TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 10,
  logLevel: NODE_ENV === 'development' ? 'debug' : 'error',
} as ConfigurationOptions

export const typesense = new Client(options)

const client = {
  typesense,
}

export default client
