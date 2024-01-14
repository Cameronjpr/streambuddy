'use client'

import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import { CommentList } from './CommentList'
import { PostInfo } from './PostInfo'
import { Post } from './types'

const FETCH_INTERVAL = 30

export function Fetcher() {
  const [data, setData] = useState({
    post: {} as Post,
    comments: [],
  })
  const [countdown, setCountdown] = useState(FETCH_INTERVAL)

  function fetchData() {
    let post, comments

    fetch(
      'https://www.reddit.com/r/LeedsUnited/comments/195sgps/post_match_thread_cardiff_city_03_leeds_united.json'
    )
      .then((res) => res.json())
      .then((data) => {
        comments = data[1].data.children.map(({ data }: { data: any }) => ({
          author: data.author,
          score: data.ups - data.downs,
          body: data.body,
        }))
        post = data[0].data.children[0].data
        console.log(post)

        setData({
          post,
          comments,
        })
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      // fetchData()
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
    <div>
      <span className="animate-pulse text-xs font-mono text-left">
        Updating in {countdown}...
      </span>
      <div className="flex flex-col gap-8">
        <PostInfo {...data.post} />
        <CommentList comments={data.comments} />
      </div>
    </div>
  )
}
