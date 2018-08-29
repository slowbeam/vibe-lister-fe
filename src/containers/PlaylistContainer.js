import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'


class PlaylistContainer extends Component {

  renderEmoji = () => {
    switch(this.props.currentMood) {
      case 'sad':
        return <img alt="" src="/images/emojis/sad.png"/>
      case 'content':
        return <img alt="" src="/images/emojis/content.png"/>
      case 'ecstatic':
        return <img alt="" src="/images/emojis/ecstatic.png"/>
    }
  }

  renderAllSongs = () => {
    switch(this.props.currentMood) {
      case 'sad':
        return this.props.sadSongs.map(song => <SongCard key={song.spotify_id} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
      case 'content':
        return this.props.contentSongs.map(song => <SongCard key={song.spotify_id} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
      case 'ecstatic':
        return this.props.ecstaticSongs.map(song => <SongCard key={song.spotify_id} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
      default:
        return <div></div>
    }

  }

  render() {
    return (
      <div className="playlist-container">
        <div className="song-card-container">
        {this.renderEmoji()}
        {this.renderAllSongs()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sadSongs: state.sadSongs,
    contentSongs: state.contentSongs,
    ecstaticSongs: state.ecstaticSongs
  }
}

export default connect(mapStateToProps)(PlaylistContainer)
