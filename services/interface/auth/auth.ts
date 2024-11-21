import client from '@/services/adapter/clerk/clerk-client'
import type { User } from '@clerk/nextjs/server'

export async function user(): Promise<{
  result: User | null
  error: Error | null
}> {
  const { result, error } = await client.user()

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

const auth = {
  user,
}

export default auth
