export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_SONG':
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}
