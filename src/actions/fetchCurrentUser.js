import APIAdapter from '../apis/adapter';
import { setCurrentUser } from './currentUser';

export const fetchCurrentUser = () => {

  return (dispatch) => {
    APIAdapter.getCurrentUser()
      .then(user => {
        dispatch(setCurrentUser(user));
      })
  }
}
