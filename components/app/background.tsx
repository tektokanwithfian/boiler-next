function Component() {
  return (
    <svg
      className="absolute inset-0 -z-10 hidden h-full w-full stroke-gray-200 [mask-image:radial-gradient(128rem_128rem_at_top,white,black)] sm:block opacity-65"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="55d3d46d-692e-45f2-becd-d8bdc9344f45"
          width={200}
          height={200}
          x="50%"
          y={0}
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y={0} className="overflow-visible fill-gray-50">
        <path
          d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#55d3d46d-692e-45f2-becd-d8bdc9344f45)" />
    </svg>
  )
}

export default Component
