import { auth, currentUser } from '@clerk/nextjs/server'
import type { User } from '@clerk/nextjs/server'

export async function user(): Promise<{
  result: User | null
  error: Error | null
}> {
  const { userId } = await auth()
  if (!userId) {
    return {
      result: null,
      error: new Error('Unauthenticated'),
    }
  }

  const result = await currentUser()
  if (!result) {
    return {
      result: null,
      error: new Error('Unauthenticated'),
    }
  }

  return { result, error: null }
}

const client = {
  user,
}

export default client
