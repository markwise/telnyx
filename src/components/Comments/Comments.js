import React, {Component} from 'react'
import './Comments.scss'

/**
 * Uses depth first traversal to recursively create the comments tree.
 *
 * @param {Array} ids
 *    An array of comment id's.
 *
 * @param {Object} comments
 *    The comments lookup table.
 *
 * @param {Object} props
 *    Additional props passed to the Comment component.
 *
 * @returns {Array}
 *    An array of top level Comment components.
*/
const createComments = (ids, comments, props) => (
  ids.map(id => {
    let comment = comments[id]
    let replies = comment.replies

    return (
      <Comment {...props} comment={comment} key={id}>
        {replies.length > 0 &&
          <div className="Comment__replies">
            {createComments(replies, comments, props)}
          </div>
        }
      </Comment>
    )
  })
)


/**
 * Returns an array of top level comment id's.
 *
 * @param {Object} comments
 *    The comments lookup table.
 *
 * @returns {Array}
 */
const getTopLevelCommentIds = comments => (
  Object.entries(comments).reduce((ids, [id, comment]) => (
    comment.parentId === null ? [...ids, id] : ids
  ), [])
)


class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {name: '', comment: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleChange(event) {
    let target = event.currentTarget
    let {name, value} = target
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSaveComment({...this.state})
  }

  handleCancel(event) {
    event.preventDefault()
    this.props.onHideCommentForm()
  }

  render() {
    let {name, comment} = this.state
    let willSubmit = name.trim().length > 0 && comment.trim().length > 0

    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Comment</label>
          <textarea
            name="comment"
            value={comment}
            onChange={this.handleChange}
           />
        </div>
        <div>
          <a href="#" onClick={this.handleCancel}>Cancel</a>
          <button type="submit" disabled={!willSubmit}>Post Comment</button>
        </div>
      </form>
    )
  }
}


class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {showCommentForm: false}
    this.handleToggleCommentForm = this.handleToggleCommentForm.bind(this)
    this.handleHideCommentForm = this.handleHideCommentForm.bind(this)
    this.handleSaveComment = this.handleSaveComment.bind(this)
  }

  handleToggleCommentForm(event) {
    event.preventDefault()
    this.setState(prevState => ({
      showCommentForm: !prevState.showCommentForm
    }))
  }

  handleHideCommentForm() {
    this.setState({showCommentForm: false})
  }

  handleSaveComment(reply) {
    let {comment, onCreateComment} = this.props

    // If the user can edit comments, we could either call onUpdateComment or
    // onCreateComment here.

    onCreateComment(comment.postId, {
      parent_id: comment.id,
      date: new Date().toISOString().substr(0, 10),
      user: reply.name,
      content: reply.comment
    })

    this.handleHideCommentForm()
  }

  render() {
    let {comment, children} = this.props
    let {showCommentForm} = this.state
    let isRootComment = !(comment.user && comment.date && comment.content)

    return (
      <div className={isRootComment ? '' : 'Comment'}>
        <div>
          {!isRootComment &&
            <div>
              <header>
                <h5 className="Comment__user">{comment.user}</h5>
                <span className="Comment__date">{new Date(comment.date).toDateString()}</span>
              </header>
              <div className="Comment__content">{comment.content}</div>
            </div>
          }
          <div>
            <a href="#" onClick={this.handleToggleCommentForm}>
              {isRootComment ? 'Add Comment' : 'Reply'}
            </a>
          </div>
          {showCommentForm &&
            <CommentForm
              onHideCommentForm={this.handleHideCommentForm}
              onSaveComment={this.handleSaveComment}
            />
          }
        </div>
        {children}
      </div>
    )
  }
}

export {Comment}


const Comments = ({comments, onCreateComment}) => {
  let ids = getTopLevelCommentIds(comments)

  return (
    <div className="Comments">
      {createComments(ids, comments, {onCreateComment})}
    </div>
  )
}

export default Comments
