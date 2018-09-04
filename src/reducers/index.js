import { combineReducers } from 'redux';
import songs from './songs';
import currentUser from './currentUser'
import users from './users'
import moods from './moods'
import ecstaticSongs from './ecstaticSongs'
import contentSongs from './contentSongs'
import sadSongs from './sadSongs'
import currentList from './currentList'
import deviceId from './deviceId'

export default combineReducers({
  songs,
  users,
  currentUser,
  moods,
  ecstaticSongs,
  contentSongs,
  sadSongs,
  currentList,
  deviceId
});
