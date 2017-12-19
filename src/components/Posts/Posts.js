import React from 'react'
import {Link} from 'react-router-dom'

const Post = ({post}) => (
  <li className="Post">
    <h3>
      <Link to={{
        pathname: `/blog/${post.slug}`,
        state: {post}
      }}>
        {post.title}
      </Link>
    </h3>
    <div>
      <span>{post.author}</span>
      <span>{post.publish_date}</span>
    </div>
    <p>{post.description}</p>
  </li>
)

const Posts = ({posts}) => (
  <ul className="Posts">
    {posts.map(post =>
      <Post
        key={post.title}
        post={post}
      />
    )}
  </ul>
)

export default Posts
