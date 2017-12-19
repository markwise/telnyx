import React, {Component} from 'react'
import Comments from 'components/Comments'
import {fetchPostBySlug, fetchCommentsByPostId} from 'src/services'

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

    // We could also store comments in history state
    let comments = await fetchCommentsByPostId(post.id)
    this.setState({post, comments})
  }

  handleCreateComment(comment) {
    console.log('creat comment')
    console.log(comment)
  }

  render() {
    let {post, comments} = this.state

    return (
      <div className="PostPage">
        <Comments
          comments={comments}
          onCreateComment={this.handleCreateComment}
        />
      </div>
    )
  }
}

export default PostPage
