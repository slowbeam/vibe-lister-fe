import React from 'react';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import ButtonBase from '@material-ui/core/ButtonBase';



const SongCard = (props) => {

  const style  = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      alignItems: 'center',
      borderRadius: '6px',
      fontFamily: "Quicksand",
      fontSize: "13px",
      margin: '6px',
      padding: '10px'
  }

  return (


        <ButtonBase className="song-card"  onClick={() => props.onClick(props.uri)} style={style}>
          <img alt="" className="album-cover-image" src={props.albumCover} />
          <h4>{props.title}</h4>
          <h4>{props.artist}</h4>
        </ButtonBase>





  )
};


export default SongCard;
