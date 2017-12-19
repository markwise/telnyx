import React, {Component} from 'react'
import Posts from 'components/Posts'

const api = 'http://localhost:9001'

const fetchPosts = async () => {
  let res = await fetch(`${api}/posts`)
  return await res.json()
}

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {posts: []}
  }

  async componentDidMount() {
    let posts = await fetchPosts()
    this.setState({posts})
  }

  render() {
    let {posts} = this.state

    return (
      <div className="Blog">
        <h2>Blog</h2>
        {posts.length > 0 ? (
          <Posts posts={posts} />
        ) : (
          <p>There are curently no posts.</p>
        )}
      </div>
    )
  }
}

export default Blog
