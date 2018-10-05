export const setCurrentPlaylistUri = (playlistUri) => {
  return {
    type: 'SET_CURRENT_PLAYLIST_URI',
    playlistUri: playlistUri
  };
};
