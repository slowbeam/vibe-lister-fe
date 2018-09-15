const defaultState = {
  playlistUrisString: null,
  playlistUri: null
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PLAYLIST_URIS_STRING':
      return {...state, playlistUrisString: action.payload}
    case 'SET_PLAYLIST_URI':
      return {...state, playlistUri: action.payload}
    default:
      return state;
  }
}
