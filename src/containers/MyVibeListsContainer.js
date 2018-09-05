import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'
import CreatePlaylist from '../components/CreatePlaylist'
import withAuth from '../hocs/withAuth';


class PlaylistContainer extends Component {

  renderAllSongs = (songArray) => {
    if (songArray.length === 0){
      return <SongCard albumCover="images/vibelist-logo-9.png" title="No Vibelist Created Yet" artist="none" />
    } else {
      return songArray.map(song => <SongCard key={song.spotify_id} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
    }
  }

  loadPlaylist = (mood) => {
    switch (mood) {
      case 'sad':
        const sadUri = this.props.currentUser.sadlist_uri
        window.location='http://localhost:3001/my-vibelists?sadUri=' + sadUri
        break;
      case 'content':
        const contentUri = this.props.currentUser.contentlist_uri
        window.location=`http://localhost:3001/my-vibelists?contentUri=${contentUri}`
        break;
      case 'ecstatic':
        const ecstaticUri = this.props.currentUser.ecstaticlist_uri
        window.location='http://localhost:3001/my-vibelists?uri=' + ecstaticUri
        }

  }



  render() {
    return (
      <div className="my-vibelist-container">
        <div className="vibelist-multi">
          <img className="emoji-image" alt="" src="/images/emojis/sad.png"/>
          <button onClick={() => this.loadPlaylist('sad')}>play</button>
          <div className="song-card-container">
          <br />

          {this.renderAllSongs(this.props.sadSongs)}
          </div>
        </div>

        <div className="vibelist-multi">
          <img className="emoji-image" src="/images/emojis/content.png"/>
          <button onClick={() => this.loadPlaylist('content')}>play</button>
          <div className="song-card-container">
          <br />

          {this.renderAllSongs(this.props.contentSongs)}
          </div>
        </div>


        <div className="vibelist-multi">
          <img className="emoji-image" alt="" src="/images/emojis/ecstatic.png"/>
          <button onClick={() => this.loadPlaylist('ecstatic')}>play</button>
          <div className="song-card-container">
          <br />
          {this.renderAllSongs(this.props.ecstaticSongs)}
          </div>
          {console.log(this.props.currentUser.contentlist_uri)}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user,
    sadSongs: state.sadSongs,
    contentSongs: state.contentSongs,
    ecstaticSongs: state.ecstaticSongs
  }
}

export default withAuth(connect(mapStateToProps)(PlaylistContainer));
