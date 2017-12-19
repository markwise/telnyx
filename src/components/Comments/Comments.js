import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CommentForm from 'components/CommentForm'
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


class Comment extends Component {
  static propTypes = {
    comment: PropTypes.shape({
      id: PropTypes.number,
      postId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      parentId: PropTypes.any,
      user: PropTypes.string,
      date: PropTypes.string,
      content: PropTypes.string,
      replies: PropTypes.array
    }).isRequired,
    onCreateComment: PropTypes.func.isRequired
  }

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

    // If the user was able to edit comments, we could either call
    // onUpdateComment or onCreateComment here.

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

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  onCreateComment: PropTypes.func.isRequired
}

export default Comments
