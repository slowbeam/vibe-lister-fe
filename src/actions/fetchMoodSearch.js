import APIAdapter from "../apis/adapter";
import { setCurrentVibelist } from "./currentVibelist";

export const fetchMoodSearch = url => {
  return dispatch => {
    return APIAdapter.searchMood(url).then(data => {
      dispatch(setCurrentVibelist(data));
    });
  };
};
