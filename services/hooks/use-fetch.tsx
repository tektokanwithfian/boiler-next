import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

import { get } from '@/services/interface/search/search'

import type { Paging, Query } from '@/types/search'

export function useFetch<T>({
  name, query, paging,
}: {
  name: string, query: Query, paging: Paging
}) {
  return useInfiniteQuery({
    queryKey: [name],
    queryFn: async ({
      pageParam,
    }): Promise<{
      items: Array<T>
      previous: number
      next: number
    }> => {
      const { result, error } = await get<T>({
        name,
        paging: { ...paging, page: pageParam },
        query,
      })

      if (!result && error) {
        throw new Error(`Error while fetching: ${error.message}`)
      }

      return {
        items: result!.items,
        previous: (result!.paging.page || 1) - 1,
        next: (result!.paging.page || 1) + 1,
      }
    },
    initialPageParam: 1,
    getPreviousPageParam: (p) => p.previous,
    getNextPageParam: (p) => p.next,
  })
}
