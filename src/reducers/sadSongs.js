export default (state = [], action) => {
  switch (action.type) {
    case "SET_SAD_SONGS":
      return [...action.songs];
    default:
      return state;
  }
};
