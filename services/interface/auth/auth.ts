import client from '@/services/adapter/clerk/clerk-client'
import type { User } from '@clerk/nextjs/server'

export async function user(): Promise<{
  result: User | null
  authenticated: boolean
  error: Error | null
}> {
  const { result, error } = await client.user()

  if (!result && error) {
    return { result: null, authenticated: false, error }
  }

  return { result, authenticated: true, error: null }
}

const auth = {
  user,
}

export default auth
