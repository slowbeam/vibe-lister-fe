import APIAdapter from "../apis/apiAdapter";
import { setCurrentUser } from "./currentUser";

export const fetchCurrentUser = () => {
  return (dispatch) => {
    APIAdapter.getCurrentUser().then((user) => {
      if (user.message !== "Please log in") {
        dispatch(setCurrentUser(user));
      }
    });
  };
};
