import React from "react";

import Player from "../../player";
import Playlist from "../../playlist";

const Vibelist = () => {
  return (
    <div className="main-container">
      <div className="create-page-content">
        <Playlist />
        <Player />
      </div>
    </div>
  );
};

export default Vibelist;
