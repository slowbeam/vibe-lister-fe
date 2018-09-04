const defaultState = {
  user: null,
  loggedIn: false,
  failedLogin: false,
  error: null
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {...state, user: action.payload, loggedIn: true}
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
