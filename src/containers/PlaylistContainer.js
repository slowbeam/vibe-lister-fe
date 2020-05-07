import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";

import * as actions from "../actions";
import withAuth from "../hocs/withAuth";

import SongCard from "../components/SongCard";
import StyledButton from "../components/shared/buttons/styledButton";

class PlaylistContainer extends Component {
  handleSaveVibelist = () => {
    const {
      currentMood,
      currentUser: { access_token },
      deviceId,
      fetchSaveVibelist,
      playlistUris,
    } = this.props;

    deviceId &&
      fetchSaveVibelist(currentMood, playlistUris, deviceId, access_token);
  };

  renderButton = () => {
    const { playlistUri } = this.props;
    let className;
    let onClick;
    let text;

    if (playlistUri) {
      onClick = this.loadCurrentPlaylist(
        window.location.search.substring(1).split("=")[1]
      );
      text = "play all";
    } else {
      className = "create-new-playlist-button";
      onClick = this.handleSaveVibelist;
      text = "Add Vibelist to Spotify";
    }

    return <StyledButton className={className} onClick={onClick} text={text} />;
  };

  loadCurrentPlaylist = (playlistUri) => {
    const {
      currentUser: { access_token },
      deviceId,
    } = this.props;

    const playUrl =
      "https://api.spotify.com/v1/me/player/play?device_id=" + deviceId;

    fetch(playUrl, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context_uri: playlistUri,
      }),
    });
  };

  renderEmoji = () => {
    const { currentMood } = this.props;
    return (
      currentMood && (
        <img
          alt={`${currentMood} emoji`}
          src={`images/emojis/${currentMood}-2.png`}
        />
      )
    );
  };

  playSong = (uri) => {
    const {
      deviceId,
      currentUser: { access_token },
    } = this.props;

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  renderCurrentSongs = () => {
    const { currentSongs } = this.props;

    return (
      currentSongs &&
      this.props.currentSongs.map((song) => (
        <SongCard
          key={uuid()}
          title={song.title}
          artist={song.artist}
          albumCover={song.album_cover}
          uri={song.uri}
          onClick={() => this.playSong(song.uri)}
        />
      ))
    );
  };

  render() {
    return (
      <div className="section playlist-container">
        {this.renderEmoji()}
        {this.renderButton()}
        <div className="song-card-container">{this.renderCurrentSongs()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    deviceId: state.deviceId,
    currentVibelist: state.currentVibelist,
    currentMood: state.currentVibelist.mood,
    playlistUris: state.currentVibelist.playlist_uris,
    playlistUri: state.currentPlaylistUri,
    currentSongs: state.currentVibelist.current_songs,
  };
};

export default withAuth(connect(mapStateToProps, actions)(PlaylistContainer));
