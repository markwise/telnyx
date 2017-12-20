import React, {Compoent} from 'react'
import {shallow, mount} from 'enzyme'
import SortOrderAction from './SortOrderAction'

const defaultProps = {
  label: 'Sort Ascending',
  order: 'asc',
  sortOrder: 'asc',
  onSortOrder: () => {}
}

const createWrapper = (renderer, props = {}) => {
  let {label, order, sortOrder, onSortOrder} = {
    ...defaultProps,
    ...props
  }

  return renderer(
    <SortOrderAction
      label={label}
      order={order}
      sortOrder={sortOrder}
      onSortOrder={onSortOrder}
    />
  )
}

it('should have prototype', () => {
  let {prototype} = SortOrderAction
  expect(prototype.handleSortOrder).toEqual(expect.any(Function))
})

describe('render', () => {
  it('should render an `<a>` element', () => {
    let wrapper = createWrapper(shallow)
    expect(wrapper.name()).toBe('a')
  })

  it('should have text `Sort Ascending`', () => {
    let wrapper = createWrapper(shallow)
    expect(wrapper.text()).toBe('Sort Ascending')
  })

  it('should have class `SortOrderAction`', () => {
    let wrapper = createWrapper(shallow)
    expect(wrapper.hasClass('SortOrderAction')).toBe(true)
  })

  it('should have class `SortOrderAction--active`', () => {
    // The component is active if the order and sortOrder props are equal.
    // order     - the expected order
    // sortOrder - the current order
    let wrapper1 = createWrapper(shallow, {
      order: 'asc',
      sortOrder: 'asc'
    })

    let wrapper2 = createWrapper(shallow, {
      order: 'desc',
      sortOrder: 'desc'
    })

    let className = 'SortOrderAction--active'
    expect(wrapper1.hasClass(className)).toBe(true)
    expect(wrapper2.hasClass(className)).toBe(true)
  })

  it('should not have class `SortOrderAction--active`', () => {
    let wrapper1 = createWrapper(shallow, {
      order: 'asc',
      sortOrder: 'desc'
    })

    let wrapper2 = createWrapper(shallow, {
      order: 'desc',
      sortOrder: 'asc'
    })

    let className = 'SortOrderAction--active'
    expect(wrapper1.hasClass(className)).toBe(false)
    expect(wrapper2.hasClass(className)).toBe(false)
  })
})

it('should call `onSortOrder` event handler', () => {
  let spy = jest.fn()
  let wrapper = createWrapper(mount, {order: 'asc', onSortOrder: spy})
  expect(spy.mock.calls.length).toBe(0)
  wrapper.simulate('click')
  expect(spy.mock.calls.length).toBe(1)
  // The order prop should be passed to the onSortOrder handler
  expect(spy.mock.calls[0][0]).toBe('asc')
})
