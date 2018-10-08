import React from 'react';
import { connect } from 'react-redux';
import StyledButton from './StyledButton';
import * as actions from '../actions';


class SavePlaylistButton extends React.Component {


  handleSaveVibelist = () =>  {
    const token = localStorage.getItem('jwt');

    const url = 'http://localhost:3000/api/v1/create-playlist-two/?mood=' + this.props.currentVibelist.mood + '&jwt=' + token

    this.props.fetchSaveVibelist(this.props.currentVibelistMood, this.props.playlistUris)
  }

    render() {
      return(
      <div>
          <StyledButton className="create-new-playlist-button" onClick={this.handleSaveVibelist}>Add Vibelist To Spotify</StyledButton>
      </div>
      )
    }

}

const mapStateToProps = state => {
  return {
    deviceId: state.deviceId,
    currentUser: state.currentUser.user,
    currentVibelist: state.currentVibelist,
    currentVibelistMood: state.currentVibelist.mood,
    playlistUris: state.currentVibelist.playlist_uris
  }
}

export default connect(mapStateToProps, actions)(SavePlaylistButton);
