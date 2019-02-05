import React from 'react';
import StyledButton from './StyledButton';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from "react-router-dom";
import { compose } from 'redux';

class CreatePlaylist extends React.Component {

  componentWillMount() {
    if (this.props.isPlayer) {
      this.props.setIsPlayer(false);
    }
  }

  visitCreatePlaylist = () => {
    this.props.history.push('/create');
  }

  render() {
    return(
    <div>
        <StyledButton className="create-new-playlist-button" onClick={this.visitCreatePlaylist}>Create a New VibeList</StyledButton>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user,
    deviceId: state.deviceId,
    trackName: state.audioPlayer.trackName,
    artistName: state.audioPlayer.artistName,
    albumName: state.audioPlayer.albumName,
    albumArt: state.audioPlayer.albumArt,
    playing: state.audioPlayer.playing,
    position: state.audioPlayer.position,
    duration: state.audioPlayer.duration,
    currentDuration: state.audioPlayer.currentDuration,
    playlistLoaded: state.audioPlayer.playlistLoaded,
    isPlayer: state.audioPlayer.isPlayer

  }
}

export default compose(
  connect(mapStateToProps, actions),
  withAuth,
  withRouter
)(CreatePlaylist);
