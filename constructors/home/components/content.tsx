'use client'

import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Card from '@/components/app/card/diary/card'
import Layout from '@/components/app/layout'

import Skeleton from '@/components/app/skeleton/card'
import { useFetch } from '@/services/hooks/use-fetch'
import type { Diary } from '@/types/diary'

import Upload from './content-upload/content'

function Component() {
  const { ref, inView } = useInView()
  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetch<Diary>({
    name: 'diary',
    paging: {
      limit: 9, page: 1,
    },
    query: {
      keyword: '*', order: 'createdAt:desc',
    },
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4">
        <Upload />
        <div className="w-full grid auto-rows-min gap-4 md:grid-cols-3">
          {status === 'pending' && (<Skeleton n={9} />)}

          {status !== 'pending' && (
          <>
            {data!.pages.map((page) => (
              <React.Fragment key={page.next}>
                {page.items.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </React.Fragment>
            ))}
          </>
          )}

          {isFetchingNextPage && !hasNextPage && (<Skeleton n={9} />)}
        </div>
        <div ref={ref} />
      </div>
    </Layout>
  )
}

export default Component
