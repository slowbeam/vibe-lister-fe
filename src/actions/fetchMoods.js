import APIAdapter from "../apis/apiAdapter";
import { setMoods } from "./moods";

export const fetchMoods = () => {
  return (dispatch) => {
    return APIAdapter.getMoods().then((moods) => {
      return dispatch(setMoods(moods));
    });
  };
};
