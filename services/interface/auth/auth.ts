import client from '@/services/adapter/clerk/clerk-client'
import { read } from '@/services/adapter/typesense/typesense-document'
import type { User } from '@/types/user'

export async function user(): Promise<{
  result: User | null
  authenticated: boolean
  error: Error | null
}> {
  const clerk = await client.user()

  if (!clerk.result && clerk.error) {
    return { result: null, authenticated: false, error: clerk.error }
  }

  const { result, error } = await read({
    name: 'user',
    params: {
      q: clerk.result?.id,
      query_by: 'provider',
      limit: 1,
      page: 1,
      filter_by: `application:${process.env.APP_NAME?.toLocaleLowerCase()}`,
    },
  })
  if (!result && error) {
    return { result: null, authenticated: false, error }
  }

  const hit = result!.hits?.[0]
  if (!hit) {
    return { result: null, authenticated: false, error }
  }

  return { result: hit.document as User, authenticated: true, error: null }
}

const auth = {
  user,
}

export default auth
