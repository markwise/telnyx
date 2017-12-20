import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './SortOrderAction.scss'

class SortOrderAction extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    onSortOrder: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleSortOrder = this.handleSortOrder.bind(this)
  }

  handleSortOrder(event) {
    event.preventDefault()
    let {onSortOrder, order} = this.props
    onSortOrder(order)
  }

  render() {
    let {order, sortOrder, label} = this.props
    let isActive = order === sortOrder

    return (
      <a
        className={`SortOrderAction ${isActive ? 'SortOrderAction--active' : ''}`}
        href="#"
        onClick={this.handleSortOrder}>
        {label}
      </a>
    )
  }
}

export default SortOrderAction
