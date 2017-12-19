import React, {Component} from 'react'
import {Post} from 'components/Posts'
import Comments, {Comment} from 'components/Comments'
import {
  fetchPostBySlug,
  fetchCommentsByPostId,
  createComment
} from 'src/services'


class PostPage extends Component {
  constructor(props) {
    super(props)
    this.state = {post: {}, comments: []}
    this.handleCreateComment = this.handleCreateComment.bind(this)
  }

  async componentDidMount() {
    let {location, match, history} = this.props
    let {state} = location
    let post

    // The post will be stored in history state if coming from the blog page.
    // Otherwise, we will have to fetch the post. This is useful if we want to
    // email the url of a blog post, for instance. Because the post can become
    // stale, we would need a way to fetch a fresh version.
    if (!(state && (post = state.post) !== void 0)) {
      post = await fetchPostBySlug(match.params.slug)
      history.replace(location.pathname, {post})
    }

    this.setState({post})
    this.fetchComments(post.id)
  }

  async handleCreateComment(postId, comment) {
    await createComment(postId, comment)
    this.fetchComments(postId)
  }

  async fetchComments(postId) {
    let data = await fetchCommentsByPostId(postId)
    this.setState({...data})
  }

  render() {
    let {post, comments, commentsCount} = this.state

    return (
      <div className="PostPage">
        <Post post={post} full={true} />
        <section>
          <h3>Comments ({commentsCount})</h3>
          <div>
            <Comment
              comment={{id: null, postId: post.id}}
              onCreateComment={this.handleCreateComment}
            />
          </div>
          <Comments
            comments={comments}
            onCreateComment={this.handleCreateComment}
          />
        </section>
      </div>
    )
  }
}

export default PostPage
