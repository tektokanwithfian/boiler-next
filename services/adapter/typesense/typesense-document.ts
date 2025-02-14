import { typesense } from '@/services/adapter/typesense/typesense-client'
import collection from '@/services/adapter/typesense/typesense-collection'

import type { CollectionFieldSchema } from 'typesense/lib/Typesense/Collection'
import type { SearchParams, SearchResponse } from 'typesense/lib/Typesense/Documents'
import type { TypesenseError } from 'typesense/lib/Typesense/Errors'

export async function create(
  { document, fields = [{ name: '.*', type: 'auto' }], name }:
  { document: Record<string, any>, fields?: CollectionFieldSchema[], name: string },
): Promise<{
    result: { ok: boolean } | null
    error: TypesenseError | null
  }> {
  try {
    const { result: isExists } = await collection
      .exists({ name })

    if (!isExists) {
      await collection.create({ name, fields })
    }

    const result = await typesense
      .collections(name)
      .documents()
      .create(document)

    if (!result) {
      throw new Error('Document was not created')
    }
    return { result: { ok: true }, error: null }
  } catch (error) {
    return { result: null, error: error as TypesenseError }
  }
}

export async function read(
  { name, params }:
  { name: string, params: SearchParams },
): Promise<{
    result: SearchResponse<Record<string, any>> | null
    error: TypesenseError | null
  }> {
  const result = await typesense
    .collections(name)
    .documents()
    .search({
      ...params,
      q: params.q || '*',
      query_by: params.query_by || '',
      page: params.page || 1,
      limit: params.limit || 10,
      sort_by: params.sort_by || 'createdAt:desc',
    })

  if (!result) {
    return { result: null, error: new Error('Document can not be read') }
  }

  return { result, error: null }
}

export async function readById(
  { id, name }:
  { id: string, name: string, },
): Promise<{
    result: Record<string, any> | null
    error: TypesenseError | null
  }> {
  const result = await typesense
    .collections(name)
    .documents(id)
    .retrieve()

  if (!result) {
    return { result: null, error: new Error('Document can not be read') }
  }

  return { result, error: null }
}

export async function remove(
  { id, name }:
  { id: string, name: string },
): Promise<{
    result: { ok: boolean } | null
    error: TypesenseError | null
  }> {
  const result = await typesense
    .collections(name)
    .documents(id)
    .delete()

  if (!result) {
    return { result: null, error: new Error('Document can not be removed') }
  }
  return { result: { ok: true }, error: null }
}

export async function update(
  {
    document, fields = [{ name: '.*', type: 'auto' }], id, name,
  }:
  { document: Record<string, any>, fields?: CollectionFieldSchema[], id: string, name: string },
): Promise<{
    result: { ok: boolean } | null
    error: TypesenseError | null
  }> {
  try {
    const { result: isExists } = await collection.exists({ name })

    if (!isExists) {
      await collection.create({ name, fields })
    }

    const result = await typesense
      .collections(name)
      .documents(id)
      .update(document)

    if (!result) {
      throw new Error('Document can not be updated')
    }
    return { result: { ok: true }, error: null }
  } catch (error) {
    return { result: null, error: error as TypesenseError }
  }
}

const document = {
  create,
  read,
  readById,
  remove,
  update,
}

export default document
