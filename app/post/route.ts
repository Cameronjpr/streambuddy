import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { Post } from '../types'
import build from 'next/dist/build'
import { buildCommentTree } from '../utils'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.error()
  }

  // Check if we have a cached version of the post
  const cached = await kv.get(id)

  if (cached) {
    console.log('cached', cached)
    const { comments, post, fetched_at } = cached as any
    const age = Date.now() - fetched_at

    if (age < 1000 * 60) { // 1 minute
      return NextResponse.json({ comments, post, fetched_at })
    }
  }

  // If we don't have a cached version, fetch it from Reddit
  const res = await fetch(
    `https://www.reddit.com/r/soccer/comments/${id}.json`,
    {
      next: { revalidate: 30 },
    }
  )

  if (!res.ok) {
    return NextResponse.error()
  }

  const data = await res.json()
  
  const comments = data[1].data.children.map((comment: any) => buildCommentTree(comment))
  
  const post = data[0].data.children[0].data satisfies Post

  await kv.set(post.id, JSON.stringify({ comments, post, fetched_at: Date.now() }))

  return NextResponse.json({ comments, post, fetched_at: Date.now() })
}
