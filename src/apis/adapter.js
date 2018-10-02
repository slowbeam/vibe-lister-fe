const SONG_URL = 'http://localhost:3000/api/v1/songs'
const USER_URL = 'http://localhost:3000/api/v1/users'
const SONG_USER_URL = 'http://localhost:3000/api/v1/song_users'
const MOOD_URL = 'http://localhost:3000/api/v1/moods'
const LOGGED_IN_USER_URL = 'http://localhost:3000/api/v1/logged-in-user'
const MOOD_SEARCH_URL = 'http://localhost:3000/api/v1/search-two'

const token = localStorage.getItem('jwt')

const fetchObj = {
  headers: {'Authorization': `Bearer ${token}`}
}

const currentUserFetchObj = {
  method: 'POST',
  headers: {
    'Content-Type': 'Application/json',
    'Authorization': `Bearer ${token}`
  }
}

const moodSearchFetchObj = {
  method: 'POST',
  headers: {
    'Content-Type': 'Application/json',
    'Authorization': `Bearer ${token}`
  }
}

export default class APIAdapter {

  static searchMood(url) {
    return fetch(url, moodSearchFetchObj)
    .then(resp=> resp.json())
  }

  static getSongs() {
    return fetch(SONG_URL, fetchObj)
      .then(resp => resp.json())
  }

  static getUsers() {
    return fetch(USER_URL, fetchObj)
      .then(resp => resp.json())
  }

  static getSongUsers() {
    return fetch(SONG_USER_URL, fetchObj)
      .then(resp => resp.json())
  }

  static getMoods() {
    return fetch(MOOD_URL, fetchObj)
      .then(resp => resp.json())
  }

  static getCurrentUser() {
    return fetch(LOGGED_IN_USER_URL, currentUserFetchObj)
      .then(resp => resp.json())
  }
}
