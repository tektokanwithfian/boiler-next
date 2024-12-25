import Link from 'next/link'
import Mark from '@/components/app/logo/mark'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const navigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: React.ComponentProps<any>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    // Add other social icons here
  ],
}

function Component() {
  return (
    <footer className="mt-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8 pt-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Mark />
            </div>
            <div>
              <h3 className="text-sm/6 font-semibold">Subscribe to our newsletter</h3>
              <p className="mt-2 text-sm/6 text-gray-800">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
            </div>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <Input
              type="email"
              name="email-address"
              id="email-address"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full min-w-0 px-3 py-1.5 placeholder:text-gray-800 sm:w-56 sm:text-sm/6"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
              <Button type="submit">
                Subscribe
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Component
