import { combineReducers } from 'redux';
import songs from './songs';
import currentUser from './currentUser';
import moods from './moods';
import currentMood from './currentMood';
import deviceId from './deviceId';
import audioPlayer from './audioPlayer';
import currentPlaylistUri from './currentPlaylistUri';
import currentGenres from './currentGenres';
import moodLists from './moodLists';
import currentVibelist from './currentVibelist';
import currentMoods from './currentMoods';
import playlistSaved from './playlistSaved';


export default combineReducers({
  songs,
  users,
  currentUser,
  moods,
  ecstaticSongs,
  contentSongs,
  sadSongs,
  currentMood,
  deviceId,
  audioPlayer,
  currentPlaylistUri,
  currentGenres,
  moodLists,
  currentVibelist,
  currentMoods,
  playlistSaved
});
