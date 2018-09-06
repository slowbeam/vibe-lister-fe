import APIAdapter from '../apis/adapter'
import { setMoods } from './moods'

export const fetchMoods = () => {

  return (dispatch) => {
    return APIAdapter.getMoods()
        .then(moods => {
          dispatch(setMoods(moods))
        })
  }
}