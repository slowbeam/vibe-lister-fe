import React, { Component } from "react";
import { connect } from "react-redux";
import SongCard from "../components/SongCard";
import SavePlaylistButton from "../components/SavePlaylistButton";
import withAuth from "../hocs/withAuth";
import uuid from "uuid";
import StyledButton from "../components/shared/buttons/styledButton";
import * as actions from "../actions";
import { createGenerateClassName } from "@material-ui/core";

class PlaylistContainer extends Component {
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

  renderButton = () => {
    let className;
    let text;
    let onClick;

    if (this.props.playlistUri) {
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
    const currentUser = this.props.currentUser;
    const playUrl =
      "https://api.spotify.com/v1/me/player/play?device_id=" +
      this.props.deviceId;

    fetch(playUrl, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${currentUser.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context_uri: playlistUri,
      }),
    });
  };

  renderEmoji = () => {
    switch (this.props.currentMood) {
      case "sad":
        return <img alt="" src="/images/emojis/sad-2.png" />;
      case "content":
        return <img alt="" src="/images/emojis/content-2.png" />;
      case "ecstatic":
        return <img alt="" src="/images/emojis/ecstatic-2.png" />;
      default:
        return;
    }
  };

  playSong = (uri) => {
    const deviceId = this.props.deviceId;
    const token = this.props.currentUser.access_token;

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  renderCurrentSongs = () => {
    if (this.props.currentSongs) {
      return this.props.currentSongs.map((song) => (
        <SongCard
          key={uuid()}
          title={song.title}
          artist={song.artist}
          albumCover={song.album_cover}
          uri={song.uri}
          onClick={() => this.playSong(song.uri)}
        />
      ));
    }
  };

  render() {
    console.log(this.props.deviceId);
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
