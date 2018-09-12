const defaultState = {
  user: null,
  displayName: null,
  profileImage: null,
  loggedIn: false,
  failedLogin: false,
  error: null
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {...state, user: action.payload, loggedIn: true}
    case 'SET_DISPLAY_NAME':
      return {...state, displayName: action.payload}
    case 'SET_PROFILE_IMAGE':
      return {...state, profileImage: action.payload}
    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin: true,
        error: action.payload
      }
    default:
      return state;
  }
}
