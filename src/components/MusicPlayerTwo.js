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
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
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


  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
  }



  render() {
    return(

        <React.Fragment>
          {this.props.playlistLoaded
            ?

            <div id="player">
              <div class="album">
                <div class="heart"><i class="fas fa-heart"></i></div>
              </div>
              <div class="info">
                <div class="progress-bar">
                  <div class="time--current">{this.props.position}</div>
                  <div class="time--total">{this.props.duration}</div>
                  <div class="fill"></div>
                </div>
                <div class="currently-playing">
                  <h2 class="song-name">{this.props.trackName}</h2>
                  <h3 class="artist-name">{this.props.artistName}</h3>
                </div>
                <div class="controls">
                  <div class="option"><i class="fas fa-bars"></i></div>
                  <div class="volume"><i class="fas fa-volume-up"></i></div>
                  <div class="previous"><i class="fas fa-backward"></i></div>
                  <div class="play"><i class="fas fa-play"></i></div>
                  <div class="pause"><i class="fas fa-pause"></i></div>
                  <div class="next"><i class="fas fa-forward"></i></div>
                  <div class="shuffle"><i class="fas fa-random"></i></div>
                  <div class="add"><i class="fas fa-plus"></i></div>
                </div>
              </div>
            </div>

            // <div className="music-player">
            //
            //     <div>
            //       <img className="player-art" src={this.props.albumArt} alt=""></img>
            //     </div>
            //
            //     <div className="player-text-buttons">
            //       <h3>Now Playing: {this.props.trackName}</h3>
            //       <h4> by {this.props.artistName} </h4>
            //         <div className="player-button-container">
            //           <button className="player-button" onClick={() => this.onPrevClick()}><img alt="" className="player-button-image" src="./Skip-previous.svg"></img></button>
            //           <button className="player-button" onClick={() => this.onPlayClick()}>{this.props.playing ? <img className="player-button-image" alt="" src="./Pause.svg"></img> : <img className="player-button-image" alt="" src="./Play.svg"></img>}</button>
            //           <button className="player-button" onClick={() => this.onNextClick()}><img className="player-button-image" alt="" src="./Skip-next.svg"></img></button>
            //         </div>
            //     </div>
            //
            //
            // </div>
            :
            <div className="music-player">
              <p>
                Click Add Playlist to Spotify to listen to your Vibelist Playlist
              </p>
              <p>
                Note: Audio player is only supported for Spotify Premium members.
              </p>
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
    playlistLoaded: state.audioPlayer.playlistLoaded

  }
}

export default withAuth(connect(mapStateToProps, actions)(MusicPlayerTwo));
