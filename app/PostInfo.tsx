type Post = {
  subreddit_name_prefixed: string
  score: number
  author: string
  title: string
  url: string
}

export function PostInfo(props: Post) {
  const { subreddit_name_prefixed, score, author, title, url } = props

  if (!title || !url) {
    return null
  }

  return (
    <section>
      <p className="text-sm text-slate-700">
        {subreddit_name_prefixed} • {author} • {score}
      </p>
      <h2>{title}</h2>
      <a className="text-sm" href={url} target="_blank">
        view original post
      </a>
    </section>
  )
}
