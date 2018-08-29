export default (state = [], action) => {
  switch (action.type) {
    case 'SET_CONTENT_SONGS':
      return [
        ...action.songs
      ]
    default:
      return state;
  }
}
