import APIAdapter from '../apis/adapter'
import { setCurrentPlaylistUri } from './currentPlaylistUri'

export const fetchMoodSearch = (mood) => {

  return (dispatch) => {
    return APIAdapter.searchMood(mood)
        .then(data => {
          dispatch(setCurrentPlaylistUri(data))
        })
  }
}
