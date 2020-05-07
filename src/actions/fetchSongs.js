import APIAdapter from "../apis/apiAdapter";
import { setSongs } from "./songs";

export const fetchSongs = () => {
  return (dispatch) => {
    return APIAdapter.getSongs().then((songs) => {
      dispatch(setSongs(songs));
    });
  };
};
