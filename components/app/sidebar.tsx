'use client'

import Link from 'next/link'
import Mark from '@/components/app/logo/icon'
import NavigationMain from '@/components/app/navigation/main'
import NavigationUser from '@/components/app/navigation/user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'

function Component({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="px-1.5">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <SidebarMenuButton asChild>
              <Link href="/" className="size-12 flex items-center">
                <Mark />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavigationMain />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-1.5">
        <NavigationUser />
      </SidebarFooter>
    </Sidebar>
  )
}

export default Component
