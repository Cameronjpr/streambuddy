import { Fetcher } from './Fetcher'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-16 items-center justify-between p-8 sm:p-24">
      <Fetcher />
    </main>
  )
}
