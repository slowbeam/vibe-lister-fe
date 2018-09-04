import { setCurrentUser } from './currentUser';

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

      dispatch(setCurrentUser({
        username: queryObj.username,
        display_name: queryObj.display_name.split("+").join(" "),
        profile_image: queryObj.profile_image,
        access_token: queryObj.access_token
      }))

      const jwt = queryObj.jwt

      localStorage.setItem('jwt', jwt)
    }
  }
};
