import APIAdapter from '../apis/adapter'
import { addSong } from './songs'


const storeAllSongs = (songArray) => {
  for (let song of songArray) {
    addSong(song)
  }
}

export const fetchSongs = () => {
  return (dispatch) => {
    return APIAdapter.getSongs()
      .then(songs => {storeAllSongs(songs)})
  }
}
