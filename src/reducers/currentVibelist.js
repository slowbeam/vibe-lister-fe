const defaultState = {
  mood: null,
  mood_list_id: null,
  playlist_uris: null,

}


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_VIBELIST_MOOD':
      return {...state, mood: action.payload}
    case 'SET_CURRENT_VIBELIST_MOOD_LIST_ID':
      return {...state, mood_list_id: action.payload}
    case 'SET_CURRENT_VIBELIST_PLAYLIST_URIS':
      return {...state, playlist_uris: action.payload}
    default:
      return state;
  }
}
