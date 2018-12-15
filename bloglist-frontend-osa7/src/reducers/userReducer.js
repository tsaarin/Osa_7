export const loginUser = (user) => {
  return async(dispatch) => {
    dispatch({
      type: 'SETLOGGEDUSER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async(dispatch) => {
    dispatch({
      type: 'CLEARLOGGEDUSER'
    })
  }
}

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'SETLOGGEDUSER':
    return action.data
  case 'CLEARLOGGEDUSER':
    return null
  default:
    return state
  }
}

export default userReducer