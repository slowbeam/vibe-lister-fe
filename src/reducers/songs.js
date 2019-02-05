export default (state = [], action) => {
  switch (action.type) {
    case "SET_SONGS":
      return [...action.songs];
    default:
      return state;
  }
};
