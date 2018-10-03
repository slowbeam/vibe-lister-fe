const defaultState = {
  mood: null,
  mood_list_id: null,
  playlist_uris: null,

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_VIBELIST':
      return action.payload;
    default:
      return state;
  }
}
