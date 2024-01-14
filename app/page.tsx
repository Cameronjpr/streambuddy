import { followThread } from './actions'

export default async function Home() {
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
