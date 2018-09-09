const defaultState = {
  trackName: "Track Name",
  artistName: "Artist Name",
  albumName: "Album Name",
  albumArt: "",
  playing: false,
  position: 0,
  duration: 0,
  currentDuration: 0,
  playlistLoaded: false
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_TRACK_NAME':
      return {...state, trackName: action.payload}
    case 'SET_ARTIST_NAME':
      return {...state, artistName: action.payload}
    case 'SET_ALBUM_NAME':
        return {...state, albumName: action.payload}
    case 'SET_ALBUM_ART':
      return {...state, albumArt: action.payload}
    case 'SET_PLAYING':
      return {...state, playing: action.payload}
    case 'SET_POSITION':
      return {...state, position: action.payload}
    case 'SET_DURATION':
      return {...state, duration: action.payload}
    case 'SET_CURRENT_DURATION':
      return {...state, currentDuration: action.payload}
    case 'SET_PLAYLIST_LOADED':
      return {...state, playlistLoaded: action.payload}
    default:
      return state;
  }
}
