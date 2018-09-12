import React from 'react';

const SongCard = (props) => {

  return (

      <div className="song-card" onClick={() => props.onClick(props.uri)}>
        <img alt="" className="album-cover-image" src={props.albumCover} />
        <h4>{props.title}</h4>
        <h4>{props.artist}</h4>
      </div>
  )
};


export default SongCard;
