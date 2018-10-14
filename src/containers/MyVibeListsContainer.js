import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'
import withAuth from '../hocs/withAuth';
import StyledButton from '../components/StyledButton'
import uuid from 'uuid';
import * as actions from '../actions';


class PlaylistContainer extends Component {

  componentDidMount(){
    this.storeAllData()
  }

  storeAllData = () => {
    this.props.fetchSongs()
    .then(() => {return this.props.fetchCurrentUser()})
    .then(() => {return this.props.fetchMoods()})
    .then(() => {return this.storeEcstaticMoodLists()})
    .then(() => {return this.storeContentMoodLists()})
    .then(() => {return this.storeSadMoodLists()})
  }

  storeEcstaticMoodLists = () => {
      if (this.props.currentUser !== null){
        const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);

        const userEcstaticMoods = userMoods.filter(mood => mood.name.includes("ecstatic"));

        const ecstaticMoodsArray = [];

        userEcstaticMoods.forEach((e,i) => (i = e.mood_list_id, ecstaticMoodsArray[i] ? ecstaticMoodsArray[i].push(e) : (ecstaticMoodsArray[i] = [e])));

        const ecstaticMoodsNoEmpties = []
        for (let el of ecstaticMoodsArray){
          if (el) {
            ecstaticMoodsNoEmpties.push(el)
          }
        }

        const ecstaticMoodLists = [...ecstaticMoodsNoEmpties];

        for (var i = 0; i < ecstaticMoodLists.length; i++) {

          const newArray = {playlist_uri: "", saved: false, songs: []}

          for (let el of ecstaticMoodLists[i]){
            newArray.playlist_uri = ecstaticMoodLists[i][0].playlist_uri;
            newArray.saved = el.saved;
            let song = this.props.songs.find(song => song.id === el.song_id)
            newArray.songs.push(song)
          }
           ecstaticMoodLists[i] = newArray
        }
          this.props.setEcstaticLists(ecstaticMoodLists)
      }
  }

  storeContentMoodLists = () => {
    if (this.props.currentUser !== null){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);

      const userContentMoods = userMoods.filter(mood => mood.name.includes("content"));

      const contentMoodsArray = [];

      userContentMoods.forEach((e,i) => (i = e.mood_list_id, contentMoodsArray[i] ? contentMoodsArray[i].push(e) : (contentMoodsArray[i] = [e])));

      const contentMoodsNoEmpties = []
      for (let el of contentMoodsArray){
        if (el) {
          contentMoodsNoEmpties.push(el)
        }
      }

      const contentMoodLists = [...contentMoodsNoEmpties];

      for (var i = 0; i < contentMoodLists.length; i++) {

        const newArray = {playlist_uri: "", saved: false, songs: []};

        for (let el of contentMoodLists[i]){
          newArray.playlist_uri = contentMoodLists[i][0].playlist_uri;
          newArray.saved = el.saved;
          let song = this.props.songs.find(song => song.id === el.song_id)
          newArray.songs.push(song)
        }
         contentMoodLists[i] = newArray
      }
        this.props.setContentLists(contentMoodLists)
    }
  }

  storeSadMoodLists = () => {
    if (this.props.currentUser !== null){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);
      const userSadMoods = userMoods.filter(mood => mood.name.includes("sad"));

      const sadMoodsArray = [];

      userSadMoods.forEach((e,i) => (i = e.mood_list_id, sadMoodsArray[i] ? sadMoodsArray[i].push(e) : (sadMoodsArray[i] = [e])));

      const sadMoodsNoEmpties = []
      for (let el of sadMoodsArray){
        if (el) {
          sadMoodsNoEmpties.push(el)
        }
      }

      const sadMoodLists = [...sadMoodsNoEmpties];

      for (var i = 0; i < sadMoodLists.length; i++) {
        const newArray = {playlist_uri: "", saved: false, songs: []};
        for (let el of sadMoodLists[i]){
          newArray.playlist_uri = sadMoodLists[i][0].playlist_uri;
          newArray.saved = el.saved;
          let song = this.props.songs.find(song => song.id === el.song_id)
          newArray.songs.push(song)
        }
         sadMoodLists[i] = newArray
      }
        this.props.setSadLists(sadMoodLists)
    }
  }


  playSong = (uri) => {
    const deviceId = this.props.deviceId;
    const token = this.props.currentUser.access_token
    // console.log(uri)

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

  }

  renderAllSongs = (songArray) => {
    if (songArray.length === 0){
      return <SongCard albumCover="images/vibelist-logo-9.png" title="No Vibelist Created Yet" artist="none" />
    } else {
      return songArray.map(song => <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} onClick={this.playSong} />)
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


renderAllSadLists = (listArray) => {
  if(listArray) {
    return listArray.map(list => {
        if(list.saved === true){
        return (
          <div key={uuid()} className="vibelist-multi">
            <img className="emoji-image" alt="" src="/images/emojis/sad-2.png"/>
            <br />
            <StyledButton onClick={() => this.loadCurrentPlaylist(list.playlist_uri)}>play all</StyledButton>
            <div className="song-card-container">
            <br />
            {this.renderAllSongs(list.songs)}
            </div>
          </div>
        )
      }
    })
  }
}

renderAllContentLists = (listArray) => {

  if (listArray) {
    return listArray.map(list => {
      if(list.saved === true){
        return (
          <div key={uuid()} className="vibelist-multi">
            <img className="emoji-image" alt="" src="/images/emojis/content-2.png"/>
            <br />
            <StyledButton onClick={() => this.loadCurrentPlaylist(list.playlist_uri)}>play all</StyledButton>
            <div className="song-card-container">
            <br />
            {this.renderAllSongs(list.songs)}
            </div>
          </div>
        )
      }

    })
  }
}

renderAllEcstaticLists = (listArray) => {
  if(listArray) {
      return listArray.map(list => {
        if(list.saved === true){
        return (
          <div key={uuid()} className="vibelist-multi">
            <img className="emoji-image" alt="" src="/images/emojis/ecstatic-2.png"/>
            <br />
            <StyledButton onClick={() => this.loadCurrentPlaylist(list.playlist_uri)}>play all</StyledButton>
            <div className="song-card-container">
            <br />
            {this.renderAllSongs(list.songs)}
            </div>
          </div>
        )
      }
    })
  }
}



  render() {
    return (
      <div className="my-vibelist-container">

        <div className="list-container">
          {this.renderAllSadLists(this.props.sadLists)}
        </div>

        <div className="list-container">
          {this.renderAllContentLists(this.props.contentLists)}
        </div>

        <div className="list-container">
          {this.renderAllEcstaticLists(this.props.ecstaticLists)}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

    deviceId: state.deviceId,
    playing: state.audioPlayer.playing,
    moods: state.moods,
    songs: state.songs,
    users: state.users,
    currentUser: state.currentUser.user,
    profileImage: state.currentUser.profileImage,
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
    moodListId: state.currentVibelist.mood_list_id

  }
}

export default withAuth(connect(mapStateToProps, actions)(PlaylistContainer));
