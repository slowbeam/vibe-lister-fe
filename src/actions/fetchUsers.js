import APIAdapter from "../apis/apiAdapter";
import { setUsers } from "./users";

export const fetchUsers = () => {
  return (dispatch) => {
    return APIAdapter.getUsers().then((users) => {
      dispatch(setUsers(users));
    });
  };
};
