export const setDisplayName = currentUser => {
  if (currentUser.message) {
    return { type: "NA" };
  } else {
    const displayName = currentUser.display_name.split(" ")[0];

    return {
      type: "SET_DISPLAY_NAME",
      payload: displayName
    };
  }
};
