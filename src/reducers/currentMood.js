export default (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MOOD':
      return action.mood
    default:
      return state;
  }
}
