'use client'

import Layout from '@/components/app/layout'

export default function Page() {
  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4">
        <div className="w-full grid auto-rows-min gap-4 md:grid-cols-3 animate-pulse">
          <div className="aspect-video rounded-xl bg-gray-900" />
          <div className="aspect-video rounded-xl bg-gray-900" />
          <div className="aspect-video rounded-xl bg-gray-900" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-gray-900 md:min-h-min animate-pulse" />
      </div>
    </Layout>
  )
}
