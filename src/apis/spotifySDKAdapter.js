const PLAY_URL = "https://api.spotify.com/v1/me/player/play?device_id=";

export default class spotifySDKAdapter {
  static loadCurrentPlaylist(accessToken, deviceId, playlistUri) {
    const url = PLAY_URL + deviceId;

    const fetchObj = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context_uri: playlistUri,
      }),
    };

    fetch(url, fetchObj);
  }

  static playSong(accessToken, deviceId, uri) {
    const url = PLAY_URL + deviceId;

    const fetchObj = {
      method: "PUT",
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(url, fetchObj);
  }
}
