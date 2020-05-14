const SONG_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/songs`;
const USER_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/users`;
const SONG_USER_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/song_users`;
const MOOD_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/moods`;
const LOGGED_IN_USER_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/logged-in-user`;

const token = localStorage.getItem("jwt");

const fetchObj = {
  headers: { Authorization: `Bearer ${token}` },
};

export default class APIAdapter {
  static loadCurrentVibelist(playlistUri, deviceId, spotifyAccessToken) {
    const playUrl =
      "https://api.spotify.com/v1/me/player/play?device_id=" + deviceId;

    const loadCurrentVibelistFetchObj = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${spotifyAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context_uri: playlistUri,
      }),
    };

    return fetch(playUrl, loadCurrentVibelistFetchObj);
  }

  static saveVibelist(mood, playlistUris) {
    const SAVE_VIBELIST_URL =
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/create-playlist/?mood=` +
      mood;

    const data = { playlist_uris: playlistUris };

    const saveFetchObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    };

    return fetch(SAVE_VIBELIST_URL, saveFetchObj).then((resp) => resp.json());
  }

  static createPlaylist(url) {
    const token = localStorage.getItem("jwt");

    const fetchObj = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return fetch(url, fetchObj).then((resp) => resp.json());
  }

  static getSongs() {
    return fetch(SONG_URL, fetchObj).then((resp) => resp.json());
  }

  static getUsers() {
    return fetch(USER_URL, fetchObj).then((resp) => resp.json());
  }

  static getSongUsers() {
    return fetch(SONG_USER_URL, fetchObj).then((resp) => resp.json());
  }

  static getMoods() {
    return fetch(MOOD_URL, fetchObj).then((resp) => resp.json());
  }

  static getCurrentUser() {
    const token = localStorage.getItem("jwt");

    const currentUserFetchObj = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return fetch(LOGGED_IN_USER_URL, currentUserFetchObj).then((resp) =>
      resp.json()
    );
  }
}
