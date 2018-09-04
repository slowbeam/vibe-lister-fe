export default (state = null, action) => {
  switch (action.type) {
    case 'SET_ARTIST_NAME':
      return action.name
    default:
      return state;
  }
}
