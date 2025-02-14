import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import Content from './components/content'

async function Component() {
  const { sessionClaims } = (await auth())

  const { onboardingCompleted } = sessionClaims!.metadata

  if (onboardingCompleted === true) {
    redirect('/')
  }

  return <Content />
}

export default Component
