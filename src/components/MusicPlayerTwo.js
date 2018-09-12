import React from 'react';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import * as actions from '../actions'

class MusicPlayerTwo extends React.Component {

  constructor(props){
    super(props);

    this.playerCheckInterval = null;
  }

  onPrevClick = () => {
    this.player.previousTrack();
  }

  onPlayClick = () => {
    this.player.togglePlay();
  }

  onNextClick = () => {
    this.player.nextTrack();
  }

  checkForPlayer(){
    if (this.props.currentUser !== null){
      const token = this.props.currentUser["access_token"];

      if (window.Spotify !== undefined){
        clearInterval(this.playerCheckInterval);
        this.player = new window.Spotify.Player({
          name: "VibeList Spotify Player",
          volume: 0.8,
          getOAuthToken: cb => { cb(token); }
        })
        this.createEventHandlers()
        this.player.connect();
      }
    }
  }

  createEventHandlers(){
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e)
    });
    this.player.on('account_error', e => {console.error(e); });
    this.player.on('playback_error', e => {console.error(e); });
    this.player.on('player_state_changed', state => this.onStateChanged(state));
    this.player.on('ready', async data => {
      let { device_id } = data;
      await this.props.setDeviceId(device_id)
      this.transferPlaybackHere();
    });
  }

  onStateChanged(state) {
    if (state !== null) {
      const currentTrack
       = state.track_window.current_track;
      const position = state.position;
      const duration = currentTrack.duration_ms;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const albumArt = currentTrack.album.images[0].url
      const playlistLoaded = true
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.props.setTrackName(trackName);
      this.props.setArtistName(artistName);
      this.props.setAlbumArt(albumArt);
      this.props.setPosition(position);
      this.props.setDuration(duration);
      this.props.setPlaying(playing);
      this.props.setPlaylistLoaded(playlistLoaded);
      this.props.setAlbumName(albumName);
    }
  }

  transferPlaybackHere = () => {
    const currentUser = this.props.currentUser
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${currentUser.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ this.props.deviceId ],
        "play": false
      }),
    })
    .then(this.loadPlaylistFromUrl)
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

  loadPlaylistFromUrl = () => {
    if (window.location.search && this.props.deviceId !== null) {
      const query = window.location.search.substring(1);
      const pair = query.split('=');
      const playlistUri = pair[1];
      this.loadCurrentPlaylist(playlistUri)
    }
  }



handlePlayerHover = () => {
  const info = document.getElementById("info");
  info.className='info up'
}

handlePlayerLeave = () => {
  const info = document.getElementById("info");
  info.className='info'
}

getAndSaveTrackPosition = () => {
  if(this.player && this.props.playing) {
    this.player.getCurrentState()
    .then(resp => {
      this.props.setPosition(resp.position)
      this.props.setCurrentDuration(resp.duration - resp.position)
      this.renderProgressBar()
    })
  }
}

renderProgressBar = () => {
  if(this.player && document.getElementById("progress-bar")) {
    const progressBar = document.getElementById("progress-bar");
    const width = (this.props.position / this.props.duration) * 100;
    progressBar.style.width = width + "%";
   }
}

convertMsToHMS = (ms) => {
    var seconds = Math.floor(ms / 1000);
    seconds = seconds % 3600;
    var minutes = parseInt( seconds / 60, 10);
    seconds = seconds % 60;
    if(seconds < 10 ) {seconds = "0" + seconds}
    return minutes + ":" + seconds;
}

  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
    this.setTrackPosition = setInterval(() => this.getAndSaveTrackPosition(), 1000)
  }



  render() {
    return(

        <React.Fragment>
          {this.props.playlistLoaded
            ?
            <div className="section music-player-container">
              <div onMouseEnter={this.handlePlayerHover} onMouseLeave={this.handlePlayerLeave} id="player">
                <div style={ {backgroundImage: `url(${this.props.albumArt})`}} className="album">

                </div>
                <div id="info" className="info">
                  <div className="progress-bar">
                    <div className="time--current">{this.convertMsToHMS(this.props.position)}</div>
                    <div className="time--total">{"-" + this.convertMsToHMS(this.props.currentDuration)}</div>
                    {this.renderProgressBar()}
                    <div id="progress-bar" className="fill"></div>
                  </div>
                  <div className="currently-playing">
                    <h2 className="song-name">{this.props.trackName}</h2>
                    <h3 className="artist-name">{this.props.artistName}</h3>
                  </div>
                  <div className="controls">
                    <div className="option"><i className="fas fa-bars"></i></div>
                    <div className="volume"><i className="fas fa-volume-up"></i></div>
                    <div onClick={() => this.onPrevClick()} className="previous"><i className="fas fa-backward"></i></div>
                    <div id="play-pause-button" onClick={() => this.onPlayClick()} className="play">
                      {this.props.playing ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}</div>
                    <div onClick={() => this.onNextClick()} className="next"><i className="fas fa-forward"></i></div>
                    <div className="shuffle"><i className="fas fa-random"></i></div>
                    <div className="add"><i className="fas fa-plus"></i></div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="section music-player-container">
              <div className="spinner">
                <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    className="length"
                    fill="none"
                    strokeWidth={8}
                    strokeLinecap="round"
                    cx={33}
                    cy={33}
                    r={28}
                  />
                </svg>
                <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    fill="none"
                    strokeWidth={8}
                    strokeLinecap="round"
                    cx={33}
                    cy={33}
                    r={28}
                  />
                </svg>
                <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    fill="none"
                    strokeWidth={8}
                    strokeLinecap="round"
                    cx={33}
                    cy={33}
                    r={28}
                  />
                </svg>
                <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    fill="none"
                    strokeWidth={8}
                    strokeLinecap="round"
                    cx={33}
                    cy={33}
                    r={28}
                  />
                </svg>
              </div>
            </div>
        }

      </React.Fragment>

    )
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user,
    deviceId: state.deviceId,
    trackName: state.audioPlayer.trackName,
    artistName: state.audioPlayer.artistName,
    albumName: state.audioPlayer.albumName,
    albumArt: state.audioPlayer.albumArt,
    playing: state.audioPlayer.playing,
    position: state.audioPlayer.position,
    duration: state.audioPlayer.duration,
    currentDuration: state.audioPlayer.currentDuration,
    playlistLoaded: state.audioPlayer.playlistLoaded

  }
}

export default withAuth(connect(mapStateToProps, actions)(MusicPlayerTwo));
