import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";

import * as actions from "../../../actions";
import withAuth from "../../../hocs/withAuth";

import SongCard from "../../shared/songCard";
import StyledButton from "../../shared/buttons/styledButton";

class allVibelists extends Component {
  componentDidMount() {
    this.storePlaylistData();
  }

  storePlaylistData = () => {
    if (this.props.currentUser) {
      this.props
        .fetchSongs()
        .then(() => {
          return this.props.fetchMoods();
        })
        .then(() => {
          return this.storeAllMoodLists();
        });
    }
  };

  createSortedMoodlistsObject = (moods) => {
    const matchingMoodlistsObj = {};

    moods.forEach((e) => {
      const moodListId = e.mood_list_id;
      const moodListObj = { moods: [e] };
      matchingMoodlistsObj[moodListId]
        ? matchingMoodlistsObj[moodListId].moods.push(e)
        : (matchingMoodlistsObj[moodListId] = moodListObj);
    });

    return matchingMoodlistsObj;
  };

  storeAllMoodLists = () => {
    if (this.props.currentUser !== null) {
      const userMoods = this.props.moods.filter(
        (mood) => mood.user_id === this.props.currentUser.id
      );

      const moodNames = ["sad", "content", "ecstatic"];

      moodNames.forEach((moodName) => {
        const matchingMoods = userMoods.filter((mood) =>
          mood.name.includes(moodName)
        );

        const matchingMoodlistsObj = this.createSortedMoodlistsObject(
          matchingMoods
        );

        const outputArray = [];

        for (let moodListId in matchingMoodlistsObj) {
          const currentMoods = matchingMoodlistsObj[moodListId]["moods"];
          const firstMood = currentMoods[0];

          const newObj = {
            mood: moodName,
            playlist_uri: firstMood.playlist_uri,
            saved: firstMood.saved,
            songs: [],
          };

          for (let mood of currentMoods) {
            const song = this.props.songs.find(
              (song) => song.id === mood.song_id
            );
            newObj.songs.push(song);
          }

          outputArray.push(newObj);
        }

        moodName === "sad"
          ? this.props.setSadLists(outputArray)
          : moodName === "content"
          ? this.props.setContentLists(outputArray)
          : this.props.setEcstaticLists(outputArray);
      });
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

  renderAllSongs = (songArray) => {
    if (songArray.length === 0) {
      return (
        <SongCard
          albumCover="images/vibelist-logo-9.png"
          title="No Vibelist Created Yet"
          artist="none"
        />
      );
    } else {
      return songArray.map((song) => (
        <SongCard
          key={uuid()}
          title={song.title}
          artist={song.artist}
          albumCover={song.album_cover}
          uri={song.uri}
          onClick={this.playSong}
        />
      ));
    }
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

  renderVibelists = (listArray) => {
    if (listArray) {
      return listArray.map((list) => {
        if (list.saved === true) {
          return (
            <div className="list-container" key={uuid()}>
              <div className="vibelist-multi">
                <img
                  className="emoji-image"
                  alt={`${list.mood} emoji`}
                  src={`/images/emojis/${list.mood}-2.png`}
                />
                <br />
                <StyledButton
                  onClick={() => this.loadCurrentPlaylist(list.playlist_uri)}
                  text="play all"
                />
                <div className="song-card-container">
                  <br />
                  {this.renderAllSongs(list.songs)}
                </div>
              </div>
            </div>
          );
        } else {
          return <div key={uuid()}></div>;
        }
      });
    }
  };

  render() {
    return (
      <div className="my-vibelist-container">
        {this.renderVibelists(this.props.sadLists)}
        {this.renderVibelists(this.props.contentLists)}
        {this.renderVibelists(this.props.ecstaticLists)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
    deviceId: state.deviceId,
    moods: state.moods,
    playing: state.audioPlayer.playing,
    songs: state.songs,
  };
};

export default withAuth(connect(mapStateToProps, actions)(allVibelists));
