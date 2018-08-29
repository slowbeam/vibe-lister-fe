import { combineReducers } from 'redux';
import songs from './songs';
import loggedInUser from './loggedInUser'
import users from './users'
import moods from './moods'

export default combineReducers({
  songs,
  users,
  moods,
  loggedInUser
});
