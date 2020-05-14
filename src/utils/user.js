import { fetchCurrentUser } from "../actions";

export const logInUser = (windowLocation) => {
  const query = windowLocation.search.substring(1);
  if (query !== "") {
    localStorage.setItem("jwt", query.split("=")[1]);
    fetchCurrentUser();
  }
};
