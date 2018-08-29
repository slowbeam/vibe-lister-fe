import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'


class PlaylistContainer extends Component {

  renderAllSongs = (songArray) => {
    return songArray.map(song => <SongCard key={song.spotify_id} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
  }

  render() {
    return (
      <div className="playlist-container">
        <div className="song-card-container">
        <img alt="" src="/images/emojis/sad.png"/>
        <br />
        {this.renderAllSongs(this.props.sadSongs)}
        </div>
        <div className="song-card-container">
        <img alt="" src="/images/emojis/content.png"/>
        <br />
        {this.renderAllSongs(this.props.contentSongs)}
        </div>
        <div className="song-card-container">
        <img alt="" src="/images/emojis/ecstatic.png"/>
        <br />
        {this.renderAllSongs(this.props.ecstaticSongs)}
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
