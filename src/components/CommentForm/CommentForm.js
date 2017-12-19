import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './CommentForm.scss'

class CommentForm extends Component {
  static propTypes = {
    onHideCommentForm: PropTypes.func.isRequired,
    onSaveComment: PropTypes.func.isRequired
  }

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
        className="CommentForm"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <div className="CommentForm__control">
          <label>Name</label>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="CommentForm__control">
          <label>Comment</label>
          <div>
            <textarea
              name="comment"
              value={comment}
              onChange={this.handleChange}
             />
          </div>
        </div>
        <div className="CommentForm__actions">
          <button type="submit" disabled={!willSubmit}>Post Comment</button>
          <a href="#" onClick={this.handleCancel}>Cancel</a>
        </div>
      </form>
    )
  }
}

export default CommentForm
