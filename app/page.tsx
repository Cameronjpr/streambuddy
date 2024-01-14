import { Fetcher } from './Fetcher'
import { Post, Comment } from './types'

export default async function Home() {
  const res = await fetch(
    'https://www.reddit.com/r/LeedsUnited/comments/195sgps/post_match_thread_cardiff_city_03_leeds_united.json'
  )

  const data = await res.json()

  const comments = data[1].data.children.map(({ data }: { data: any }) => ({
    author: data.author,
    score: data.ups - data.downs,
    body: data.body,
  })) satisfies Comment[]

  const post = data[0].data.children[0].data satisfies Post

  console.log(post)

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
