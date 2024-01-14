import { Fetcher } from './Fetcher'
import { Post, Comment } from './types'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-16 items-center justify-between p-8 sm:p-24">
      <section className="text-center">
        <h1>Streambuddy</h1>
        <p>Live threads, but later</p>
      </section>
      <div className="flex flex-col gap-16 justify-start">
        <Fetcher />
      </div>
    </main>
  )
}
