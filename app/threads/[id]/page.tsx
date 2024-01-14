import { Fetcher } from '@/app/Fetcher'
import { redirect } from 'next/navigation'

export default async function ThreadPage({
  params,
}: {
  params: { id: string }
}) {
  if (!params.id) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen flex-col gap-16 items-center justify-between p-4 sm:p-12">
      <Fetcher threadId={params.id} />
    </main>
  )
}
