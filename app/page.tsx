import { redirect } from 'next/navigation'

export default async function Home() {
  async function followThread(formData: FormData) {
    'use server'

    let threadLink = formData.get('match-thread') as string
    let splitLink = threadLink.split('/')

    // Catch mobile share links and grab the underlying thread link
    if (
      splitLink[2] === 'www.reddit.com' &&
      splitLink.some((part) => part === 's')
    ) {
      const res = await fetch(threadLink)

      threadLink = res.url.split('?')[0]
      splitLink = threadLink.split('/')
    }

    let threadId
    try {
      threadId = splitLink?.[6]

      console.log(threadId)
    } catch (error) {
      throw new Error('Invalid thread link')
    }

    if (!!threadId) {
      redirect(`/threads/${threadId}`)
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
