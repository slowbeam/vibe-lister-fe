import React from 'react';
import { connect } from 'react-redux';
import SpotifyPlayer from 'react-spotify-player';
import withPlaylist from '../hocs/withPlaylist'

const size = {
  width: '100%',
  height: 300,
};

const view = 'list';  // or 'coverart'
const theme = 'black'; // or 'white'

class ReactSpotifyPlayer extends React.Component {


  render() {
    return (
      <div className="react-spotify-player-container">
      <SpotifyPlayer
        uri={this.props.currentPlaylist}
        size={size}
        view={view}
        theme={theme}
      />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPlaylist: state.currentPlaylist
  }
}

export default withPlaylist(connect(mapStateToProps)(ReactSpotifyPlayer))
