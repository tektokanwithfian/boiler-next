'use client'

import { UsersRound } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/app/card/profile/card'
import Layout from '@/components/app/layout'

import Skeleton from '@/components/app/skeleton/card'
import { useFetch } from '@/services/hooks/use-fetch'
import type { Profile } from '@/types/user'

function Component() {
  const { data, isLoading } = useFetch<Profile>({
    name: 'profile',
    paging: {
      limit: 9, page: 1,
    },
    query: {
      keyword: '*', order: 'createdAt:desc',
    },
  })

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4">
        {isLoading && (
          <div className="w-full grid auto-rows-min gap-4 pt-4  md:grid-cols-3 animate-pulse">
            <Skeleton n={3} />
          </div>
        )}
        {!isLoading && (
          <div className="w-full grid auto-rows-min gap-4 pt-4  md:grid-cols-3">
            <div className="flex flex-col rounded-xl border-4 border-dashed border-gray-300 grain">
              <div className="flex flex-col justify-center h-full items-center p-8">
                <UsersRound className="size-12 text-gray-600" />
                <Link href="/profile/add">
                  Add a new profile
                </Link>
              </div>
            </div>
            {data?.items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Component
