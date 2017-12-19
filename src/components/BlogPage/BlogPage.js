import React, {Component} from 'react'
import Posts from 'components/Posts'
import SortOrderAction from 'components/SortOrderAction'
import {fetchPosts} from 'services'
import './BlogPage.scss'

const sortPostsByDate = (posts, order = 'asc') => (
  posts.sort((a, b) => {
    let int = new Date(a.publish_date) - new Date(b.publish_date)
    return order === 'desc' ? int * -1 : int
  })
)

class BlogPage extends Component {
  constructor(props) {
    super(props)
    this.state = {posts: [], order: 'asc', isFetching: true}
    this.handleSortOrder = this.handleSortOrder.bind(this)
  }

  async componentDidMount() {
    let posts = await fetchPosts()
    this.setState({posts, isFetching: false})
  }

  handleSortOrder(order) {
    this.setState({order})
  }

  render() {
    let {state} = this

    // We could render a loader here instead of rendering nothing at all.
    if (state.isFetching) return null

    let order = state.order
    let posts = sortPostsByDate(state.posts, order)
    let count = posts.length

    return (
      <div className="BlogPage">
        <header className="BlogPage__header">
          <h2 className="BlogPage__heading">Posts ({count})</h2>
          <div>
            <SortOrderAction
              label="Newest"
              order="asc"
              sortOrder={order}
              onSortOrder={this.handleSortOrder}
            />
            <SortOrderAction
              label="Oldest"
              order="desc"
              sortOrder={order}
              onSortOrder={this.handleSortOrder}
            />
          </div>
        </header>
        {count > 0 ? (
          <Posts posts={posts} />
        ) : (
          <p>There are curently no posts.</p>
        )}
      </div>
    )
  }
}

export default BlogPage
