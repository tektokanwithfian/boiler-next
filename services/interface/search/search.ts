import typesense from '@/services/adapter/typesense/typesense-document'
import type { Paging, Query } from '@/services/adapter/typesense/typesense-type'
import auth from '@/services/interface/auth/auth'

import type { SearchParams } from 'typesense/lib/Typesense/Documents'
import type { TypesenseError } from 'typesense/lib/Typesense/Errors'

export async function get(
  { name, paging, query }:
  { name: string, paging: Paging, query: Query },
): Promise<{
    result: {
      paging: Paging
      Query: Query
      items: Record<string, any>[]
    } | null
    error: TypesenseError | null
  }> {
  const { limit, page } = paging
  const { keyword, field, order } = query

  if (name === 'user') {
    throw new Error('User search is not implemented')
  }

  const { result: user } = await auth.user()
  const params = {
    filter_by: `user:${user?.id}`,
    limit,
    page,
    q: keyword,
    query_by: field,
    sort_by: order,
  } as SearchParams

  if (query.filter) {
    params.filter_by = `${params.filter_by} && ${query.filter}`
  }

  const { result } = await typesense.read({ name, params })

  paging.count = result && result.found > 0 ? result.found : 0
  paging.total = result && result.found > 0 ? Math.ceil(result.found / limit!) : 0
  paging.page = result && result.page ? result.page : 1

  const items = result && result.hits ? result.hits.map((hit) => hit.document) : []

  return { result: { paging, Query: query, items }, error: null }
}

export async function getById(
  { name, id }:
  { name: string, id: string },
): Promise<{
    result: Record<string, any> | null
    error: TypesenseError | null
  }> {
  const { result, error } = await typesense.readById({ id, name })
  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}
