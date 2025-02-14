'use client'

import { Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

function Component() {
  const pathname = usePathname()
  const [home, ...paths] = pathname.split('/')

  if (pathname === '/') {
    return null
  }

  const routes = paths.reduce((acc: { label: string, href: string }[], curr, i) => {
    if (i === 0) {
      return [{ label: curr, href: `/${curr}` }]
    }
    return [...acc, { label: curr, href: `${acc}/${curr}` }]
  }, [])

  return (
    <div className="w-full flex grain p-4 py-2 rounded-lg">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${home}`}>
              <Home className="size-6" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {routes && routes.length > 0 && routes.map((route, i) => (
            <Fragment key={i}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {i === routes.length - 1 ? (
                  <BreadcrumbPage className="capitalize text-lg">{route.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={route.href} className="capitalize text-lg">
                    {route.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Component
