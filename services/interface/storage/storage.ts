import bucket from '@/services/adapter/google-storage/google-storage-bucket'

export async function read(
  { key }:
  { key: string },
): Promise<{
    result: string | null
    error: Error | null
  }> {
  const { result, error } = await bucket.read({ key })

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
  const { result, error } = await bucket.remove({ key })

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
  const { result, error } = await bucket.write({ key, type })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

const storage = {
  read,
  remove,
  write,
}

export default storage
