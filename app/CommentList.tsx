import { Comment } from './types'

type CommentListProps = {
  comments: Comment[]
}

export function CommentList(props: CommentListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {props.comments.map((comment: Comment) => (
        <li key={comment.author} className="flex flex-col gap-1">
          <span className="text-sm text-slate-500">
            {comment.author} • {comment.score}
          </span>
          <p className="text-lg">{comment.body}</p>
          <section className="pl-4 border-l-2 border-slate-600">
            {comment.replies && <CommentList comments={comment.replies} />}
          </section>
        </li>
      ))}
    </ul>
  )
}
