import APIAdapter from '../apis/adapter'
import { setLoggedInUser } from './loggedInUser'

export const fetchLoggedInUser = () => {

  return (dispatch) => {
    APIAdapter.getLoggedInUser()
      .then(user => {
        dispatch(setLoggedInUser(user))
      })
  }
}
