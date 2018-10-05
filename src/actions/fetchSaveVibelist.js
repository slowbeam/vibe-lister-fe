import APIAdapter from '../apis/adapter'
import { setCurrentPlaylistUri } from './currentPlaylistUri'

export const fetchSaveVibelist = (mood, playlistUris) => {

  return (dispatch) => {
    return APIAdapter.saveVibelist(mood, playlistUris)
        .then(data => {
          dispatch(setCurrentPlaylistUri(data))
        })
  }
}
