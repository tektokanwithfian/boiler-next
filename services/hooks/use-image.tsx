import { useQuery } from '@tanstack/react-query'

export function useImage({
  key,
}: {
  key: string
}) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await fetch('/api/signedurl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      })
      const { url }: { url: string } = await response.json()

      if (!url) {
        throw new Error('Error while fetching')
      }

      return url
    },
    staleTime: 1 * 60 * 1000,
  })
}
