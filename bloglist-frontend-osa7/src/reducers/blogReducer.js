import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async(dispatch) => {
    const blogs = await blogService.getAll()
    console.log('dispatching blogs')
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNewBlog = (blogObject) => {
  return async(dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async(dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: { id }
    })
  }
}

export const likeBlog = (blogObject) => {
  return async(dispatch) => {
    const likedBlog = await blogService.update(blogObject.id, blogObject)
    dispatch({
      type: 'LIKE',
      data: { id: likedBlog.id }
    })
  }
}

export const commentBlog = (id, comments) => {
  return async(dispatch) => {
    const commentedBlog = await blogService.comment(id, comments)
    dispatch({
      type: 'COMMENT',
      data: { id, comments }
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    console.log('returning blogs: ', action.data)
    return action.data
  case 'CREATE':
    return [...state, action.data]
  case 'DELETE':
    return state.filter(({ id }) => id !== action.data.id)
  case 'LIKE': {
    const old = state.filter(blog => blog.id !== action.data.id)
    const liked = state.find(blog => blog.id === action.data.id)
    return [...old, { ...liked, likes: liked.likes + 1 }]
  }
  case 'COMMENT': {
    const old = state.filter(blog => blog.id !== action.data.id)
    const commented = state.find(blog => blog.id === action.data.id)
    return [...old, { ...commented, comments: action.data.comments }]
  }
  default:
    return state
  }
}

export default blogReducer