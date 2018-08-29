import APIAdapter from '../apis/adapter'
import { setSongs } from './songs'

export const fetchSongs = () => {

  return (dispatch) => {
    return APIAdapter.getSongs()
      .then(songs => {
        dispatch(setSongs(songs))})
  }
}
