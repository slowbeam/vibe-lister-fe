import React from 'react';
import Button from '@material-ui/core/Button';

const CreatePlaylist = (props) => {

  const visitCreatePlaylist = () => {
    window.location='http://localhost:3001/create';
  }

    return(
    <div>
        <Button className="create-new-playlist-button" onClick={visitCreatePlaylist}>Create a New VibeList</Button>
    </div>

    )
}

export default CreatePlaylist;
