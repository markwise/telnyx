import React, {Compoent} from 'react'
import {shallow, mount} from 'enzyme'
import CommentForm from './CommentForm'

const defaultProps = {
  onHideCommentForm: () => {},
  onSaveComment: () => {}
}

const createWrapper = (renderer, props = {}) => {
  let {onHideCommentForm, onSaveComment} = {
    ...defaultProps,
    ...props
  }

  return renderer(
    <CommentForm
      onHideCommentForm={onHideCommentForm}
      onSaveComment={onSaveComment}
    />
  )
}

it('should have prototype', () => {
  let {prototype} = CommentForm
  expect(prototype.handleChange).toEqual(expect.any(Function))
  expect(prototype.handleSubmit).toEqual(expect.any(Function))
  expect(prototype.handleCancel).toEqual(expect.any(Function))
})

describe('render', () => {
  it('should render a `<form>` element', () => {
    let wrapper = createWrapper(shallow)
    expect(wrapper.name()).toBe('form')
  })

  it('should have class `CommentForm`', () => {
    let wrapper = createWrapper(shallow)
    expect(wrapper.hasClass('CommentForm')).toBe(true)
  })

  it('cancel button should have text `Cancel`', () => {
    let wrapper = createWrapper(shallow)
    expect(wrapper.find('.CommentForm__cancel').text()).toBe('Cancel')
  })

  it('submit button should have text `Post Comment`', () => {
    let wrapper = createWrapper(shallow)
    expect(wrapper.find('.CommentForm__submit').text()).toBe('Post Comment')
  })

  it('submit button should be disabled', () => {
    let wrapper1 = createWrapper(shallow)
    expect(wrapper1.find('.CommentForm__submit').prop('disabled')).toBe(true)

    let wrapper2 = createWrapper(shallow)
    // Both name and comment are required to submit
    wrapper2.setState({name: 'foo'})
    expect(wrapper2.find('.CommentForm__submit').prop('disabled')).toBe(true)
  })

  it('submit button should be enabled', () => {
    let wrapper = createWrapper(shallow)
    wrapper.setState({name: 'foo', comment: 'bar'})
    expect(wrapper.find('.CommentForm__submit').prop('disabled')).toBe(false)
  })
})

it('should set state', () => {
  let wrapper = createWrapper(shallow)
  expect(wrapper.state()).toEqual({name: '', comment: ''})

  wrapper.find('input[name="name"]').simulate('change', {
    currentTarget: {
      name: 'name',
      value: 'foo'
    }
  })

  expect(wrapper.state()).toEqual({name: 'foo', comment: ''})

  wrapper.find('textarea[name="comment"]').simulate('change', {
    currentTarget: {
      name: 'comment',
      value: 'bar'
    }
  })

  expect(wrapper.state()).toEqual({name: 'foo', comment: 'bar'})
})

it('should call `onHideCommentForm` event handler', () => {
  let spy = jest.fn()
  let wrapper = createWrapper(mount, {onHideCommentForm: spy})
  expect(spy).not.toHaveBeenCalled()
  wrapper.find('.CommentForm__cancel').simulate('click')
  expect(spy).toHaveBeenCalled()
})

it('should call `onSaveComment` event handler', () => {
  let spy = jest.fn()
  let wrapper = createWrapper(mount, {onSaveComment: spy})
  expect(spy).not.toHaveBeenCalled()
  wrapper.setState({name: 'foo', comment: 'bar'})
  wrapper.simulate('submit')
  expect(spy).toHaveBeenCalled()
  expect(spy.mock.calls[0][0]).toEqual({name: 'foo', comment: 'bar'})
})
