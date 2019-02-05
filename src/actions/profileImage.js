export const setProfileImage = currentUser => {
  if (currentUser.message) {
    return { type: "NA" };
  } else {
    const profileImage = currentUser.profile_image;

    return {
      type: "SET_PROFILE_IMAGE",
      payload: profileImage
    };
  }
};
