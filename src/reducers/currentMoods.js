export default (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_MOODS':
      return [
        ...action.moods
      ]
    default:
      return state;
  }
}
