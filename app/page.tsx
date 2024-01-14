import { redirect } from 'next/navigation'

export default async function Home() {
  async function followThread(formData: FormData) {
    'use server'

    const threadLink = formData.get('match-thread') as string

    let threadId
    try {
      threadId = threadLink?.split('/')?.[6]
    } catch (error) {
      throw new Error('Invalid thread link')
    }

    if (!!threadId) {
      redirect(`/thread/${threadId}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col gap-16 items-center p-4 sm:p-12">
      <h2>Paste a match thead link and press Start!</h2>
      <form
        action={followThread}
        className="w-96 flex flex-col items-center gap-2"
      >
        <label htmlFor="match-thread">Match thread</label>
        <input name="match-thread" type="text" />
        <button type="submit">Start</button>
      </form>
    </main>
  )
}
