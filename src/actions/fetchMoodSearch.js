import APIAdapter from "../apis/apiAdapter";
import { setCurrentVibelist } from "./currentVibelist";

export const fetchMoodSearch = (url) => {
  return (dispatch) => {
    return APIAdapter.searchMood(url).then((data) => {
      dispatch(setCurrentVibelist(data));
    });
  };
};
