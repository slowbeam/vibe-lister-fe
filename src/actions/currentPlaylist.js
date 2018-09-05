export const setCurrentPlaylist = (playlistUri) => {
  return {
    type: 'SET_CURRENT_PLAYLIST',
    playlistUri: playlistUri
  };
};
