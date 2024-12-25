'use client'

import {
  ChartPie,
  Bot,
  CalendarClock,
} from 'lucide-react'

import Link from 'next/link'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

function Component() {
  return (
    <SidebarGroup className="px-1.5">
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link href="/" className="size-12 flex items-center">
                <ChartPie className="size-6" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="flex items-center justify-center">
            <SidebarMenuButton asChild tooltip="Assistant">
              <Link href="/" className="size-12 flex items-center">
                <Bot className="size-6" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="flex items-center justify-center">
            <SidebarMenuButton asChild tooltip="Report">
              <Link href="/" className="size-12 flex items-center">
                <CalendarClock className="size-6" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default Component
