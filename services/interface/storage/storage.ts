import bucket from '@/services/adapter/storage/storage-bucket'
import auth from '@/services/interface/auth/auth'
import type { File } from '@google-cloud/storage'

export async function list(
  { key }:
  { key: string },
): Promise<{
    result: File[] | null
    error: Error | null
  }> {
  const { result: user } = await auth.user()
  if (!user) {
    return { result: null, error: new Error('Unauthorised request') }
  }
  const { result, error } = await bucket.list({ key: `${user.id}/${key}` })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

export async function read(
  { key }:
  { key: string },
): Promise<{
    result: string | null
    error: Error | null
  }> {
  const { result: user } = await auth.user()
  if (!user) {
    return { result: null, error: new Error('Unauthorised request') }
  }
  const { result, error } = await bucket.read({ key: `${user.id}/${key}` })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

export async function remove(
  { key }:
  { key: string },
): Promise<{
    result: { ok: boolean } | null
    error: Error | null
  }> {
  const { result: user } = await auth.user()
  if (!user) {
    return { result: null, error: new Error('Unauthorised request') }
  }
  const { result, error } = await bucket.remove({ key: `${user.id}/${key}` })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

export async function write(
  { key, type }:
  { key: string, type: string },
): Promise<{
    result: string | null
    error: Error | null
  }> {
  const { result: user } = await auth.user()
  if (!user) {
    return { result: null, error: new Error('Unauthorised request') }
  }
  const { result, error } = await bucket.write({ key: `${user.id}/${key}`, type })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

const storage = {
  list,
  read,
  remove,
  write,
}

export default storage
