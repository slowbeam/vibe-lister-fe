import APIAdapter from "../apis/adapter";

export const fetchSaveVibelist = (
  mood,
  playlistUris,
  deviceId,
  accessToken
) => {
  return dispatch => {
    const request = APIAdapter.saveVibelist(mood, playlistUris);

    return request.then(response => {
      APIAdapter.loadCurrentVibelist(
        response.playlist_uri,
        deviceId,
        accessToken
      );
    });
  };
};
