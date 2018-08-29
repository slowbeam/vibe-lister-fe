import React from 'react';

const CreatePlaylist = (props) => {

  const visitCreatePlaylist = () => {
    window.location='http://localhost:3001/create';
  }

    return(
    <div>
        <button className="create-new-playlist-button" onClick={visitCreatePlaylist}>Create a New VibeList</button>
    </div>

    )
}

export default CreatePlaylist;
