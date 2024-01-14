import { Comment } from "./types";

export function buildCommentTree(rawComment: unknown): Comment {
  const data = (rawComment as any).data

  let c = {
    author: data.author,
    score: data.ups - data.downs,
    body: data.body,
    replies: data.replies?.data?.children.map((comment: unknown) => buildCommentTree(comment)),
  }

  if (!data.replies) {
    return c
  }

  return {
    ...c,
    replies: data.replies?.data?.children.map(buildCommentTree),
  }
}