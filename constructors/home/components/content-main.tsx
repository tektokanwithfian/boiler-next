import MainAction from './content-main-action'
import MainDescription from './content-main-description'
import MainImage from './content-main-image'

function Component() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <MainImage />
      <MainDescription />
      <MainAction />
    </main>
  )
}

export default Component
