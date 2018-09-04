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
  audioPlayer
});
