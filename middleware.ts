import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isOnboardingRoute = createRouteMatcher(['/onboarding'])
const routes = [
  '/',
  '/api/m/(.*)',
  '/api/plan',
  '/api/user',
  '/api/subscription/cancel',
  '/api/subscription/status',
  '/privacy',
  '/signin(.*)',
  '/signup(.*)',
  '/terms',
]

const isPublicRoute = createRouteMatcher(routes)

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { redirectToSignIn, userId, sessionClaims } = await auth()

  if (!userId) {
    if (!isPublicRoute(req)) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
  }

  if (userId) {
    if (isOnboardingRoute(req) && !isPublicRoute(req)) {
      return NextResponse.next()
    }

    if (
      sessionClaims?.metadata?.onboardingComplete
  && sessionClaims?.metadata?.onboardingTNCAgreed
    ) {
      return NextResponse.next()
    }

    if (
      !sessionClaims?.metadata?.onboardingComplete
  && !sessionClaims?.metadata?.onboardingTNCAgreed
    ) {
      const onboardingUrl = new URL('/onboarding', req.url)

      return NextResponse.redirect(onboardingUrl)
    }
  }

  /* eslint-disable */
  return 
  /* eslint-enable */
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',
  ],
}
