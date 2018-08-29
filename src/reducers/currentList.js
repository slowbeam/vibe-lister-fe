export default (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LIST':
      return [
        ...action.mood
      ]
    default:
      return state;
  }
}
