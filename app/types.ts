export type Comment = {
  author: string
  score: number
  body: string
  replies?: Comment[]
}

export type Post = {
  subreddit_name_prefixed: string
  title: string
  score: number
  url: string
  author: string
}