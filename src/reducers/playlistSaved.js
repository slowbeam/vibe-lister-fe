export default (state = false, action) => {
  switch (action.type) {
    case "SET_PLAYLIST_SAVED":
      return action.payload;
    default:
      return state;
  }
};
