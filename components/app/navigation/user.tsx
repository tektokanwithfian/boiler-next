import { UserButton } from '@clerk/clerk-react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import type { Elements } from '@clerk/types'

export interface Props extends React.ComponentProps<'div'> {
  elements?: Elements
  showName?: boolean
}

function Component({
  elements = {
    userButtonBox: 'flex flex-row-reverse',
    userButtonTrigger: 'focus:shadow-none',
    avatarBox: 'size-8 drop-shadow-md',
  },
  showName = false,
}: Props) {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-center">
        <SidebarMenuButton className="hover:bg-transparent active:bg-transparent">
          <UserButton
            showName={showName}
            appearance={{ elements }}
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default Component
