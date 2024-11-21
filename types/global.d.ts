export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean
      onboardingTNCAgreed?: boolean
    }
  }
}
