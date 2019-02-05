import React from "react";
import { connect } from "react-redux";
import StyledButton from "./StyledButton";
import * as actions from "../actions";

class SavePlaylistButton extends React.Component {
  handleSaveVibelist = () => {
    if (this.props.deviceId) {
      const spotifyAccessToken = this.props.currentUser.access_token;
      this.props.fetchSaveVibelist(
        this.props.currentMood,
        this.props.playlistUris,
        this.props.deviceId,
        spotifyAccessToken
      );
    }
  };

  render() {
    return (
      <div>
        <StyledButton
          className="create-new-playlist-button"
          onClick={this.handleSaveVibelist}
        >
          Add Vibelist To Spotify
        </StyledButton>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceId: state.deviceId,
    currentUser: state.currentUser.user,
    currentMood: state.currentVibelist.mood,
    playlistUris: state.currentVibelist.playlist_uris
  };
};

export default connect(
  mapStateToProps,
  actions
)(SavePlaylistButton);
