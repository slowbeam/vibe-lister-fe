export default (state = null, action) => {
  switch (action.type) {
    case "SET_TRACK_NAME":
      return action.name;
    default:
      return state;
  }
};
