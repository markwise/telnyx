import React, {Component} from 'react'

const createComments = (ids, comments, props) => (
  ids.map(id => {
    let comment = comments[id]
    let replies = comment.replies

    return (
      <Comment {...props} comment={comment} key={id}>
        {replies.length > 0 &&
          <ul>
            {createComments(replies, comments, props)}
          </ul>
        }
      </Comment>
    )
  })
)

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
    let {props, state} = this

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
            value={state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Comment</label>
          <textarea
            name="comment"
            value={state.comment}
            onChange={this.handleChange}
           />
        </div>
        <div>
          <a href="#" onClick={this.handleCancel}>Cancel</a>
          <button type="submit">Reply</button>
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

    onCreateComment({
      postId: comment.postId,
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

    return (
      <li className="Comment">
        <div>
          <header>
            <h5>{comment.user}</h5>
            <div>{new Date(comment.date).toDateString()}</div>
          </header>
          <div>{comment.content}</div>
          <div>
            <a href="#" onClick={this.handleToggleCommentForm}>Reply</a>
          </div>
          {showCommentForm &&
            <CommentForm
              onHideCommentForm={this.handleHideCommentForm}
              onSaveComment={this.handleSaveComment}
            />
          }
        </div>
        {children}
      </li>
    )
  }
}


const Comments = ({comments, onCreateComment}) => {
  let ids = getTopLevelCommentIds(comments)

  return (
    <div className="Comments">
      <ul>
        {createComments(ids, comments, {onCreateComment})}
      </ul>
    </div>
  )
}

export default Comments
