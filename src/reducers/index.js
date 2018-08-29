import { combineReducers } from 'redux';
import songs from './songs';
import loggedInUser from './loggedInUser'
import users from './users'
import moods from './moods'
import ecstaticSongs from './ecstaticSongs'

export default combineReducers({
  songs,
  users,
  loggedInUser,
  moods,
  ecstaticSongs
});
