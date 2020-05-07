import React from "react";

import AllVibelists from "./allVibelists";
import Player from "../../player";

const MyVibeLists = () => {
  return (
    <div className="my-vibelists-wrapper">
      <AllVibelists />
      <Player />
    </div>
  );
};

export default MyVibeLists;
