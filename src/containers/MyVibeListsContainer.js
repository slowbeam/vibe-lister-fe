import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'
import withAuth from '../hocs/withAuth';
import StyledButton from '../components/StyledButton'
import uuid from 'uuid';


class PlaylistContainer extends Component {

  renderAllSongs = (songArray) => {
    if (songArray.length === 0){
      return <SongCard albumCover="images/vibelist-logo-9.png" title="No Vibelist Created Yet" artist="none" />
    } else {
      return songArray.map(song => <SongCard key={uuid()} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
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
        break;
      default:
        return ""
        }
  }

renderAllSadLists = (listArray) => {
  if(listArray) {
    return listArray.map(list => {
      return (
        <div key={uuid()} className="vibelist-multi">
          <img className="emoji-image" alt="" src="/images/emojis/sad-2.png"/>
          <StyledButton onClick={() => this.loadPlaylist('sad')}>play</StyledButton>
          <div className="song-card-container">
          <br />
          {this.renderAllSongs(list)}
          </div>
        </div>
      )
    })
  }
}

renderAllContentLists = (listArray) => {
  if(listArray) {
    return listArray.map(list => {
      return (
        <div key={uuid()} className="vibelist-multi">
          <img className="emoji-image" alt="" src="/images/emojis/content-2.png"/>
          <StyledButton onClick={() => this.loadPlaylist('sad')}>play</StyledButton>
          <div className="song-card-container">
          <br />
          {this.renderAllSongs(list)}
          </div>
        </div>
      )
    })
  }
}

renderAllEcstaticLists = (listArray) => {
  if(listArray) {
    return listArray.map(list => {
      return (
        <div key={uuid()} className="vibelist-multi">
          <img className="emoji-image" alt="" src="/images/emojis/ecstatic-2.png"/>
          <StyledButton onClick={() => this.loadPlaylist('sad')}>play</StyledButton>
          <div className="song-card-container">
          <br />
          {this.renderAllSongs(list)}
          </div>
        </div>
      )
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
    contentLists: state.moodLists.happyLists,
    ecstaticLists: state.moodLists.ecstaticLists
  }
}

export default withAuth(connect(mapStateToProps)(PlaylistContainer));
