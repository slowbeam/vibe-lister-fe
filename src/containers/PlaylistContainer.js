import React, { Component } from 'react';
import { connect } from 'react-redux'
import SongCard from '../components/SongCard'


class PlaylistContainer extends Component {

  renderAllSongs = (songArray) => {
    return songArray.map(song => <SongCard key={song.spotify_id} title={song.title} artist={song.artist} albumCover={song.album_cover} uri={song.uri} />)
  }

  render() {
    return (
      <div className="song-card-container">
      {this.renderAllSongs(this.props.songs)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs
  }
}

export default connect(mapStateToProps)(PlaylistContainer)
