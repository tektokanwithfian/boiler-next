import { typesense } from '@/services/adapter/typesense/typesense-client'
import type { CollectionFieldSchema } from 'typesense/lib/Typesense/Collection'
import type { TypesenseError } from 'typesense/lib/Typesense/Errors'

export async function create(
  { name, fields }:
  { name: string, fields: CollectionFieldSchema[] },
): Promise<{
    result: { ok: boolean } | null
    error: TypesenseError | null
  }> {
  try {
    const { ok } = await typesense
      .collections()
      .create({
        name, fields, enable_nested_fields: true,
      })
      .then(() => ({ ok: true }))
      .catch((error) => {
        throw error
      })
    return { result: { ok }, error: null }
  } catch (error) {
    return { result: null, error: error as TypesenseError }
  }
}

export async function exists({ name }: { name: string }): Promise<{
  result: { ok: boolean } | null
  error: TypesenseError | null
}> {
  try {
    const { ok } = await typesense
      .collections(name)
      .retrieve()
      .then(() => ({ ok: true }))
      .catch((error) => {
        throw error
      })
    return { result: { ok }, error: null }
  } catch (error) {
    return { result: null, error: error as TypesenseError }
  }
}

export async function count({ name }: { name: string }): Promise<{
  result: { count: number } | null
  error: TypesenseError | null
}> {
  try {
    const result = await typesense
      .collections(name)
      .retrieve()
      .then((collection) => ({ count: collection.num_documents }))
      .catch((error) => {
        throw error
      })
    return { result, error: null }
  } catch (error) {
    return { result: null, error: error as TypesenseError }
  }
}

const collection = {
  create,
  exists,
  count,
}

export default collection
