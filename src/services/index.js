const api = 'http://localhost:9001'

export const fetchPosts = async () => {
  let res = await fetch(`${api}/posts`)
  return await res.json()
}

export const fetchPostBySlug = async slug => {
  let res = await fetch(`${api}/posts?slug=${slug}`)
  let data = await res.json()
  return data[0]
}

export const fetchCommentsByPostId = async id => {
  let res = await fetch(`${api}/posts/${id}/comments`)
  let data = await res.json()

  // Convert data to a lookup table
  let comments = data.reduce((acc, {parent_id:parentId, ...comment}) => (
    {...acc, [comment.id]: {...comment, parentId, replies: []}}
  ), {})

  // Add child comment id's to parent comment
  data.forEach(({id, parent_id:parentId}) => {
    if (parentId !== null) {
      let comment = comments[parentId]
      comment.replies = [...comment.replies, id]
    }
  })

  return {comments, commentsCount: data.length}
}

export const createComment = async (postId, comment) => {
  let res = await fetch(`${api}/posts/${postId}/comments`, {
    method: 'post',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await res.json()
}
