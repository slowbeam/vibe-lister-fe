export default (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PLAYLIST_URI':
      return action.playlistUri
    default:
      return state;
  }
}
