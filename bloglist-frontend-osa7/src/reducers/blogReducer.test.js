import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  it('should return new state with action CREATE', () => {
    const state = []
    const action = {
      type: 'CREATE',
      data: {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: 'dummy',
        id: 1
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })

  it('should return new state with action LIKE', () => {
    const state = [
      {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: 'dummy',
        id: 1
      }
    ]
    const action = {
      type: 'LIKE',
      data: {
        id: 1
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toContainEqual({
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 1,
      user: 'dummy',
      id: 1
    })
  })

  it('should return new state with action DELETE', () => {
    const state = [
      {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: 'dummy',
        id: 1
      },
      {
        title: 'deletable',
        author: 'deletable',
        url: 'deletable',
        likes: 4,
        user: 'deletable',
        id: 2
      }
    ]
    const action = {
      type: 'DELETE',
      data: {
        id: 2
      }
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toContainEqual({
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 0,
      user: 'dummy',
      id: 1
    })
    expect(newState.length).toBe(1)
  })
})