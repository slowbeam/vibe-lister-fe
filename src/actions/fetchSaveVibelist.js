import APIAdapter from '../apis/adapter'
import { setCurrentPlaylistUri } from './currentPlaylistUri'

export const fetchSaveVibelist = (url) => {

  return (dispatch) => {
    return APIAdapter.saveVibelist(url)
        .then(data => {
          dispatch(setCurrentPlaylistUri(data))
        })
  }
}
