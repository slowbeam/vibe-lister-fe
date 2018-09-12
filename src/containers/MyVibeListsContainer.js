import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'
import withAuth from '../hocs/withAuth';
import StyledButton from '../components/StyledButton'
import uuid from 'uuid';


class PlaylistContainer extends Component {


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
            <StyledButton onClick={() => this.loadCurrentPlaylist(list.playlist_uri)}>load playlist</StyledButton>
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
            <StyledButton onClick={() => this.loadCurrentPlaylist(list.playlist_uri)}>load playlist</StyledButton>
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
            <StyledButton onClick={() => this.loadCurrentPlaylist(list.playlist_uri)}>load playlist</StyledButton>
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
    currentUser: state.currentUser.user,
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
    deviceId: state.deviceId,
    playing: state.audioPlayer.playing

  }
}

export default withAuth(connect(mapStateToProps)(PlaylistContainer));
