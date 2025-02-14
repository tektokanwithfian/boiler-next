import Breadcrumb from '@/components/app/breadcrumb'
import Sidebar from '@/components/app/sidebar'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import type { CSSProperties } from 'react'

function Component(
  { children }:
  { children: React.ReactNode },
) {
  return (
    <SidebarProvider
      defaultOpen={false}
      open={false}
      style={{
        '--sidebar-width': '3.25rem',
        '--sidebar-width-mobile': '3.25rem',
        '--sidebar-width-icon': '3.25rem',
        '--sidebar-background': '360 100% 100%',
      } as CSSProperties}
    >
      <Sidebar />
      <SidebarInset className="max-w-screen-xl mx-auto p-4 bg-white">
        <Breadcrumb />
        <div className="w-full flex min-h-screen pb-20 md:pb-0">
          {children}
        </div>
        <div className="pb-[100px]" />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Component
