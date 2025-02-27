import { user } from '@/services/interface/auth/auth'

import Content from './components/content'
import Landing from './components/content-landing/content'

async function Component() {
  const { authenticated } = await user()

  return authenticated
    ? (<Content />)
    : (<Landing />)
}

export default Component
