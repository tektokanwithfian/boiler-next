import { storage } from '@/services/adapter/storage/storage-client'
import type { File, GetSignedUrlConfig } from '@google-cloud/storage'

export async function list(
  { key }:
  { key: string },
): Promise<{
    result: File[] | null
    error: Error | null
  }> {
  try {
    const [files] = await storage
      .bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME || '')
      .getFiles({ prefix: key })

    return { result: files, error: null }
  } catch (error) {
    return { result: null, error: error as Error }
  }
}

export async function read(
  { key }:
  { key: string },
): Promise<{
    result: string | null
    error: Error | null
  }> {
  const options = {
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60 * 12,
    version: 'v4',
  } as GetSignedUrlConfig

  try {
    const [url] = await storage
      .bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME || '')
      .file(key)
      .getSignedUrl(options)

    return { result: url, error: null }
  } catch (error) {
    return { result: null, error: error as Error }
  }
}

export async function remove(
  { key }:
  { key: string },
): Promise<{
    result: { ok: boolean } | null
    error: Error | null
  }> {
  try {
    await storage
      .bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME || '')
      .file(key)
      .delete()

    return { result: { ok: true }, error: null }
  } catch (error) {
    return { result: null, error: error as Error }
  }
}

export async function write(
  { key, type }:
  { key: string, type: string },
): Promise<{
    result: string | null
    error: Error | null
  }> {
  const options = {
    action: 'write',
    contentType: type,
    expires: Date.now() + 1000 * 60 * 60 * 1,
    version: 'v4',
  } as GetSignedUrlConfig

  try {
    const [url] = await storage
      .bucket(process.env.GOOGLE_STORAGE_BUCKET_NAME || '')
      .file(key)
      .getSignedUrl(options)

    return { result: url, error: null }
  } catch (error) {
    return { result: null, error: error as Error }
  }
}

const bucket = {
  list,
  read,
  remove,
  write,
}

export default bucket
