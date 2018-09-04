const SONG_URL = 'http://localhost:3000/api/v1/songs'
const USER_URL = 'http://localhost:3000/api/v1/users'
const SONG_USER_URL = 'http://localhost:3000/api/v1/song_users'
const MOOD_URL = 'http://localhost:3000/api/v1/moods'
const LOGGED_IN_USER_URL = 'http://localhost:3000/api/v1/logged-in-user'

export default class APIAdapter {
  static getSongs() {
    return fetch(SONG_URL)
      .then(resp => resp.json())
  }

  static getUsers() {
    return fetch(USER_URL)
      .then(resp => resp.json())
  }

  static getSongUsers() {
    return fetch(SONG_USER_URL)
      .then(resp => resp.json())
  }

  static getMoods() {
    return fetch(MOOD_URL)
      .then(resp => resp.json())
  }

  static getLoggedInUser() {
    return fetch(LOGGED_IN_USER_URL)
      .then(resp => resp.json())
  }
}
