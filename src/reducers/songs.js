export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_SONGS':
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}
