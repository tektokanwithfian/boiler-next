import Background from '@/components/app/background'

import ContentHeading from './content-heading'
import ContentLogo from './content-logo'
import ContentProfile from './content-profile/content'

function Component() {
  return (
    <main>
      <div className="relative isolate">
        <Background />
        <div className="max-w-md w-full mx-auto space-y-6">
          <ContentLogo />
          <ContentHeading />
          <ContentProfile />
        </div>
        <div className="pb-[100px] lg:pt-10" />
      </div>
    </main>
  )
}

export default Component
