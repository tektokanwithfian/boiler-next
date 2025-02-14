function Component({ n = 1 }: { n?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <div
          key={i}
          className="animate-pulse flex flex-col rounded-xl border border-gray-200 shadow-sm p-4 bg-white justify-between relative"
        >
          <div className="flex items-center gap-x-4 rounded-lg bg-gray-200 p-4">
            <div className="h-12 w-12 flex-0 rounded-lg bg-gray-300" />
            <div className="flex justify-between items-start flex-1">
              <div className="space-y-2">
                <div className="h-2 w-32 bg-gray-300 rounded" />
                <div className="h-2 w-24 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
          <dl className="divide-y divide-gray-100 py-4 text-sm leading-6 bg-white">
            <div className="flex flex-row items-center justify-between gap-x-4 py-3">
              <dt className="h-2 flex-1 bg-gray-300 rounded" />
              <dd className="h-2 flex-1 bg-gray-300 rounded" />
            </div>
            <div className="flex flex-row items-center justify-between gap-x-4 py-3">
              <dt className="h-2 flex-1 bg-gray-300 rounded" />
              <dd className="h-2 flex-1 bg-gray-300 rounded" />
            </div>
          </dl>
        </div>
      ))}
    </>
  )
}

export default Component
