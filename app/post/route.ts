import { NextRequest } from 'next/server'
import { kv } from '@vercel/kv'
import { Post } from '../types'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  console.log(id)
  if (!id) {
    return Response.error()
  }

  const cached = await kv.get(id)

  if (cached) {
    console.log('reading from cache')
    const { comments, post, fetched_at } = cached as any
    const age = Date.now() - fetched_at

    if (age < 1000 * 60) { // 1 minute
      return Response.json({ comments, post, fetched_at })
    }
  }

  console.log('fetching from reddit')
  const res = await fetch(
    'https://www.reddit.com/r/LeedsUnited/comments/195sgps/post_match_thread_cardiff_city_03_leeds_united.json',
    {
      next: { revalidate: 30 },
    }
  )

  const data = await res.json()
  
  const comments = data[1].data.children.map(({ data }: { data: any }) => ({
    author: data.author,
    score: data.ups - data.downs,
    body: data.body,
  }))
  
  const post = data[0].data.children[0].data satisfies Post

  await kv.set(post.id, JSON.stringify({ comments, post, fetched_at: Date.now() }))

  return Response.json({ comments, post, fetched_at: Date.now() })
}
