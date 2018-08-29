export default (state = [], action) => {
  switch (action.type) {
    case 'SET_ECSTATIC_SONGS':
      return [
        ...action.songs
      ]
    default:
      return state;
  }
}
