export default (state = null, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN_USER':
      return action.user
    default:
      return state;
  }
}
