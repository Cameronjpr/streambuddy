'use server'

import { redirect } from "next/navigation"

export async function followThread(formData: FormData) {
  let threadLink = formData.get('match-thread') as string
  let splitLink = threadLink.split('/')

  console.log(splitLink)
  // Catch mobile share links and grab the underlying thread link
  if (splitLink.includes('www.reddit.com') && splitLink.includes('s')) {
    console.log('mobile link')
    const res = await fetch(threadLink)

    console.log(res.url)

    threadLink = res.url.split('?')[0]
    splitLink = threadLink.split('/')
  }

  let threadId
  try {
    threadId = splitLink?.[6]

    console.log(threadId)
  } catch (error) {
    throw new Error('Invalid thread link')
  }

  if (!!threadId) {
    redirect(`/threads/${threadId}`)
  }
}
