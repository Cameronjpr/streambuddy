import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

type ProviderProps = {
  children: ReactNode
}

// Create a client
const queryClient = new QueryClient()

export function Providers(props: ProviderProps) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
