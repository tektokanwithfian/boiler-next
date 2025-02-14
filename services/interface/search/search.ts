'use server'

import typesense from '@/services/adapter/typesense/typesense-document'
import type { Paging, Query } from '@/services/adapter/typesense/typesense-type'
import auth from '@/services/interface/auth/auth'

import type { SearchParams } from 'typesense/lib/Typesense/Documents'
import type { TypesenseError } from 'typesense/lib/Typesense/Errors'

export async function get<T>(
  { name, paging, query }:
  { name: string, paging: Paging, query: Query },
): Promise<{
    result: {
      paging: Paging
      query: Query
      items: T[]
    } | null
    error: TypesenseError | null
  }> {
  const { limit, page } = paging
  const { keyword, field, order } = query

  const { result: user } = await auth.user()
  const params = {
    limit,
    page,
    q: keyword,
    query_by: field,
    sort_by: order,
  } as SearchParams

  if (query.filter) {
    params.filter_by = query.filter
  }

  if (name !== 'user') {
    const filter = `user:${user?.id}`

    if (query.filter) {
      params.filter_by = `${filter} && ${query.filter}`
    } else {
      params.filter_by = filter
    }
  }

  const { result } = await typesense.read({ name, params })

  paging.count = result && result.found > 0 ? result.found : 0
  paging.total = result && result.found > 0 ? Math.ceil(result.found / limit!) : 0
  paging.page = result && result.page ? result.page : 1

  const items = result && result.hits
    ? result.hits.map((hit) => hit.document) as T[]
    : []

  return {
    result: { paging, query, items },
    error: null,
  }
}

export async function getById<T>(
  { name, id }:
  { name: string, id: string },
): Promise<{
    result: T | null
    error: TypesenseError | null
  }> {
  const { result, error } = await typesense.readById({ id, name })
  if (!result && error) {
    return { result: null, error }
  }

  return { result: result as T, error: null }
}
