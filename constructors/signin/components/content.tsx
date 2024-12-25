import { SignIn } from '@clerk/nextjs'

import Background from '@/components/app/background'

function Component() {
  return (
    <div className="relative isolate">
      <Background />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen m-auto">
          <SignIn forceRedirectUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default Component
