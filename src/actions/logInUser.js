import { setCurrentUser } from './currentUser';
import { setDisplayName } from './displayName';
import { setProfileImage } from './profileImage'

export const LogInUser = (windowLocation) => {
  return (dispatch) => {
    const query = windowLocation.search.substring(1);
    if (query !== ""){
      const queryPairs = query.split('&');

      let queryObj ={};
      for (var i = 0; i < queryPairs.length; i++) {
          var pair = queryPairs[i].split('=');
          queryObj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }

      const userObj = {
          username: queryObj.username,
          display_name: queryObj.display_name.split("+").join(" "),
          profile_image: queryObj.profile_image,
          access_token: queryObj.t
        }


      dispatch(setCurrentUser(userObj));
      dispatch(setDisplayName(userObj));
      dispatch(setProfileImage(userObj));

      const jwt = queryObj.jwt

      localStorage.setItem('jwt', jwt)
    }
  }
};
