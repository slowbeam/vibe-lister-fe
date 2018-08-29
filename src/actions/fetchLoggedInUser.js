import APIAdapter from '../apis/adapter'
import { setUsers } from './users'

export const fetchUsers = () => {

  return (dispatch) => {
    APIAdapter.getUsers()
      .then(users => {
        dispatch(setUsers(users))
      })
  }
}
