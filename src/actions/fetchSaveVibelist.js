import APIAdapter from '../apis/adapter'
import { setCurrentPlaylistUri } from './currentPlaylistUri'
import { loadCurrentVibelist } from './loadCurrentVibelist'

export const fetchSaveVibelist = (mood, playlistUris, deviceId, accessToken) => {
  return (dispatch) => {
    const request = APIAdapter.saveVibelist(mood, playlistUris)

    return request.then(response => dispatch(loadCurrentVibelist(response, deviceId, accessToken)))

  }
}
