import { Comment } from './types'

type CommentListProps = {
  comments: Comment[]
}

export function CommentList(props: CommentListProps) {
  return (
    <ul className="flex flex-col gap-8 max-w-2xl">
      {props.comments.map((comment: Comment) => (
        <li key={comment.author} className="flex flex-col gap-2">
          <span className="text-xs text-slate-700">
            {comment.author} • {comment.score}
          </span>
          <p className="text-sm">{comment.body}</p>
        </li>
      ))}
    </ul>
  )
}
