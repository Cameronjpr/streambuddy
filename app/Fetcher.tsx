'use client'

import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import { CommentList } from './CommentList'
import { PostInfo } from './PostInfo'
import { Post } from './types'

const FETCH_INTERVAL = 60

export function Fetcher() {
  const [data, setData] = useState({
    post: {} as Post,
    comments: [],
    fetched_at: null,
  })
  const [countdown, setCountdown] = useState(FETCH_INTERVAL)

  async function fetchData() {
    const res = await fetch('/post?id=196mg2i')
    const data = await res.json()

    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      fetchData()
      setCountdown(FETCH_INTERVAL)
    }
  }, [countdown])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <section className="flex justify-between gap-8 text-xs font-mono">
        <span>Updating in {countdown}...</span>
        <span>
          Last updated at{' '}
          {data?.fetched_at ? new Date(data.fetched_at).toLocaleString() : ''}
        </span>
      </section>
      <div className="flex flex-col gap-8">
        <PostInfo {...data.post} />

        <section>
          <h2>{data.comments.length} Comments</h2>
          <CommentList comments={data.comments} />
        </section>
      </div>
    </div>
  )
}
