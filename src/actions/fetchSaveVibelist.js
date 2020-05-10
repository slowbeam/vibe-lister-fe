import APIAdapter from "../apis/apiAdapter";
import { setPlaylistUri } from "./playlistUri";

export const fetchSaveVibelist = (
  mood,
  playlistUris,
  deviceId,
  accessToken
) => {
  return (dispatch) => {
    const request = APIAdapter.saveVibelist(mood, playlistUris);

    return request.then((response) => {
      dispatch(setPlaylistUri(response.playlist_uri));
      APIAdapter.loadCurrentVibelist(
        response.playlist_uri,
        deviceId,
        accessToken
      );
    });
  };
};
