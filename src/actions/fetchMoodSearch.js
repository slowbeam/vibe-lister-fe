import APIAdapter from '../apis/adapter'
import { setCurrentVibelist } from './currentVibelist'

export const fetchMoodSearch = (mood) => {

  return (dispatch) => {
    return APIAdapter.searchMood(mood)
        .then(data => {
          dispatch(setCurrentVibelist(data))
        })
  }
}
