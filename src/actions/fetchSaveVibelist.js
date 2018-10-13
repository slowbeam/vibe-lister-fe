import APIAdapter from '../apis/adapter'
import { setCurrentPlaylistUri } from './currentPlaylistUri'
import { loadCurrentVibelist } from './loadCurrentVibelist'

export const fetchSaveVibelist = (mood, playlistUris, deviceId, accessToken) => {
  return (dispatch) => {
    return APIAdapter.saveVibelist(mood, playlistUris)
        .then(data => {
          return dispatch(loadCurrentVibelist(data, deviceId, accessToken))
        })
  }
}
