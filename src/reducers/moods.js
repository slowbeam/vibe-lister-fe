export default (state = [], action) => {
  switch (action.type) {
    case 'SET_MOODS':
      return [
        ...action.moods
      ]
    default:
      return state;
  }
}
