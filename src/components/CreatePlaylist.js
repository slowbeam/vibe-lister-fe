import React from 'react';
import StyledButton from './StyledButton';

const CreatePlaylist = (props) => {

  const visitCreatePlaylist = () => {
    window.location='http://localhost:3001/create';
  }

    return(
    <div>
        <StyledButton className="create-new-playlist-button" onClick={visitCreatePlaylist}>Create a New VibeList</StyledButton>
    </div>

    )
}

export default CreatePlaylist;
