import APIAdapter from "../apis/apiAdapter";
import { setCurrentVibelist } from "./currentVibelist";

export const fetchCreatePlaylist = (url) => {
  return (dispatch) => {
    return APIAdapter.createPlaylist(url).then((data) => {
      dispatch(setCurrentVibelist(data));
    });
  };
};
