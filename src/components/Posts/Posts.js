import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {CommentForm} from 'components/Comments'
import './Posts.scss'

export const Post = ({post, full = false}) => {
  return (
    <div className="Post">
      <h2 className="Post__title">
        {full ? (
          <span>{post.title}</span>
        ) : (
          <Link
            to={{
              pathname: `/blog/${post.slug}`,
              state: {post}
            }}>
            {post.title}
          </Link>
        )}
      </h2>
      <div className="Post__author">
        <span>{post.author}</span>
        {' '}/{' '}
        <span>{new Date(post.publish_date).toDateString()}</span>
      </div>
      {full ? (
        <div
          className="Post__content"
          dangerouslySetInnerHTML={{__html: post.content}}
        />
      ) : (
        <p className="Post__description">{post.description}</p>
      )}
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    author: PropTypes.string,
    publish_date: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  full: PropTypes.bool
}


const Posts = ({posts}) => (
  <div className="Posts">
    {posts.map(post =>
      <Post post={post} key={post.title} />
    )}
  </div>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
