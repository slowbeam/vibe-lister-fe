import React from 'react';

const SavePlaylistButton = (props) => {

  const visitCreatePlaylist = () => {
    window.location='http://localhost:3000/api/v1/create-playlist';
  }

    return(
    <div>
        <button className="create-new-playlist-button" onClick={visitCreatePlaylist}>Add Vibelist To Spotify</button>
    </div>

    )
}

export default SavePlaylistButton;
