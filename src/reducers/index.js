import { combineReducers } from 'redux';
import songs from './songs';
import currentUser from './currentUser';
import users from './users';
import moods from './moods';
import ecstaticSongs from './ecstaticSongs';
import contentSongs from './contentSongs';
import sadSongs from './sadSongs';
import currentMood from './currentMood';
import deviceId from './deviceId';
import audioPlayer from './audioPlayer';
import currentPlaylist from './currentPlaylist'
import currentGenres from './currentGenres'
import moodLists from './moodLists'
import currentVibelist from './currentVibelist'


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
  currentPlaylist,
  currentGenres,
  moodLists,
  currentVibelist
});
