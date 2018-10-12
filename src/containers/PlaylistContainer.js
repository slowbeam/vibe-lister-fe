import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'
import SavePlaylistButton from '../components/SavePlaylistButton'
import withAuth from '../hocs/withAuth';
import uuid from 'uuid';
import StyledButton from '../components/StyledButton';
import * as actions from '../actions';
import APIAdapter from '../apis/adapter';

class PlaylistContainer extends Component {

  componentDidMount() {

  }


  handleSaveVibelist = () =>  {
    const token = localStorage.getItem('jwt');

    const url = 'http://localhost:3000/api/v1/create-playlist-two/?mood=' + this.props.currentVibelist.mood + '&jwt=' + token

    this.props.fetchSaveVibelist(this.props.currentVibelistMood, this.props.playlistUris)
  }

  renderButton = () => {
    if (this.props.playlistUri){
        const query = window.location.search.substring(1);
        const pair = query.split('=');
        const playlistUri = pair[1];
      return <StyledButton onClick={() => this.loadCurrentPlaylist(playlistUri)}>play all</StyledButton>
    } else {
      return <SavePlaylistButton />
    }
  }

  loadCurrentPlaylist = (playlistUri) => {

    const currentUser = this.props.currentUser
    const playUrl = "https://api.spotify.com/v1/me/player/play?device_id=" + this.props.deviceId


    fetch( playUrl, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${currentUser.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "context_uri": playlistUri
      })
    })

  }

  renderEmoji = () => {
    switch(this.props.currentVibelistMood) {
      case 'sad':
        return <img alt="" src="/images/emojis/sad-2.png"/>
      case 'content':
        return <img alt="" src="/images/emojis/content-2.png"/>
      case 'ecstatic':
        return <img alt="" src="/images/emojis/ecstatic-2.png"/>
      default:
        return
    }
  }

  playSong = (uri) => {
    const deviceId = this.props.deviceId;
    const token = this.props.currentUser.access_token

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  }

  renderSongsFromFetchMoods = (moods) => {

    if(this.props.songs) {
      const matchedMoods = moods.filter(mood => mood.mood_list_id === this.props.moodListId);

      let currentSongsArr = [];

      for (let mood of matchedMoods) {
        currentSongsArr.push(this.props.songs.find(mood.song_id))
      }

      debugger;

      return currentSongsArr.map(song =>  <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} onClick={() => this.playSong(song.uri)} />)
    }

  }

  returnSongs = (songs ) => {
    return songs.map(song =>  <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} onClick={() => this.playSong(song.uri)} />)
  }

  renderSongsTwo = () => {
    if(this.props.moods.length !== 0 && this.props.moodListId){

    }

  }

  renderAllSongs = () => {
    switch(this.props.currentVibelistMood) {
      case 'sad':
        const lastSadList = this.props.sadLists[this.props.sadLists.length - 1]
        if (lastSadList) {
          return lastSadList.songs.map(song =>  <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} onClick={() => this.playSong(song.uri)} />)
        }
      break;
      case 'content':
          const lastContentList = this.props.contentLists[this.props.contentLists.length - 1]
          if (lastContentList) {
            return lastContentList.songs.map(song => <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} onClick={() => this.playSong(song.uri)} />)
          }
        break;
      case 'ecstatic':
        const lastEcstaticList = this.props.ecstaticLists[this.props.ecstaticLists.length - 1]
        if (lastEcstaticList){
          return lastEcstaticList.songs.map(song => <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} onClick={() => this.playSong(song.uri)} />)
        }
        break;
      default:
        return <div></div>
    }
  }

  render() {
    console.log('MOODS AFTER', this.props.moods)
    return (
        <div className="section playlist-container">
          {this.renderEmoji()}
          {this.renderButton()}
          <div className="song-card-container">
          {this.renderSongsTwo()}
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
    currentMood: state.currentMood,
    currentUser: state.currentUser.user,
    deviceId: state.deviceId,
    currentVibelist: state.currentVibelist,
    currentVibelistMood: state.currentVibelist.mood,
    playlistUris: state.currentVibelist.playlist_uris,
    playlistUri: state.currentPlaylistUri,
    moods: state.moods,
    moodListId: state.currentVibelist.mood_list_id
  }
}


export default withAuth(connect(mapStateToProps, actions)(PlaylistContainer))
