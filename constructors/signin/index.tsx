import { redirect } from 'next/navigation'
import { user } from '@/services/interface/auth/auth'

import Content from './components/content'

async function Component() {
  const { authenticated } = await user()

  if (authenticated) {
    redirect('/')
  }

  return <Content />
}

export default Component
