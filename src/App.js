import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import MoodEmojiSelector from './components/MoodEmojiSelector';
import PlaylistContainer from './containers/PlaylistContainer';
import MusicPlayer from './components/MusicPlayer';
import WelcomePage from './components/WelcomePage';
import { connect } from 'react-redux';
import { setLoggedInUser } from './actions/loggedInUser';
import { fetchLoggedInUser } from './actions/fetchLoggedInUser';
import { fetchUsers } from './actions/fetchUsers';
import { fetchSongs } from './actions/fetchSongs';
import { fetchMoods } from './actions/fetchMoods';
import { setEcstaticSongs } from './actions/ecstaticSongs';
import { setContentSongs } from './actions/contentSongs';
import { setSadSongs } from './actions/sadSongs';
import { setDeviceId } from './actions/deviceId';


class App extends Component {

  constructor(props){
  super(props);
  this.state = {
    trackName: "Track Name",
    artistName: "Artist Name",
    albumName: "Album Name",
    albumArt: "",
    playing: false,
    position: 0,
    duration: 0,
    playlistLoaded: false
  };

  this.playerCheckInterval = null;
}


  storeEcstaticSongs = () => {
      if (this.props.loggedInUser !== null){
        const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.loggedInUser.id);
        const userEcstaticMoods = userMoods.filter(mood => mood.name.includes("ecstatic"));
        const userEcstaticSongIds = userEcstaticMoods.map(mood => mood.song_id)
        const userEcstaticSongs = this.props.songs.filter(song => userEcstaticSongIds.includes(song.id))
        this.props.setEcstaticSongs(userEcstaticSongs)
      }

  }

  storeContentSongs = () => {
    if (this.props.loggedInUser !== null){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.loggedInUser.id);
      const userContentMoods = userMoods.filter(mood => mood.name.includes("content"));
      const userContentSongIds = userContentMoods.map(mood => mood.song_id)
      const userContentSongs = this.props.songs.filter(song => userContentSongIds.includes(song.id))
      this.props.setContentSongs(userContentSongs)
    }
  }

  storeSadSongs = () => {
    if (this.props.loggedInUser !== null){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.loggedInUser.id);
      const userSadMoods = userMoods.filter(mood => mood.name.includes("sad"));
      const userSadSongIds = userSadMoods.map(mood => mood.song_id)
      const userSadSongs = this.props.songs.filter(song => userSadSongIds.includes(song.id))
      this.props.setSadSongs(userSadSongs)
    }
  }


  storeAllData = () => {
    this.props.fetchSongs()
    .then(() => {return this.props.fetchLoggedInUser()})
    .then(() => {return this.props.fetchMoods()})
    .then(() => {return this.props.fetchUsers()})
    .then(() => {return this.storeEcstaticSongs()})
    .then(() => {return this.storeContentSongs()})
    .then(() => {return this.storeSadSongs()})
  }

  checkForPlayer(){
    if (this.props.loggedInUser !== null){
      const token = this.props.loggedInUser["access_token"];

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
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing,
        albumArt,
        playlistLoaded
      });
    }
  }

  transferPlaybackHere = () => {
    const loggedInUser = this.props.loggedInUser
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${loggedInUser.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ this.props.deviceId ],
        "play": false
      }),
    })
  }

  loadCurrentPlaylist = (playlistUri) => {

    const loggedInUser = this.props.loggedInUser

    const playUrl = "https://api.spotify.com/v1/me/player/play?device_id=" + this.props.deviceId
    fetch( playUrl, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${loggedInUser.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "context_uri": playlistUri
      })
    })
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


  componentDidMount(){
    // this.storeAllData()
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
  }



  Login = () => {
    return (<div></div>
    )
  }

  Welcome = () => {
    return (
      <WelcomePage />
    )
  }

  CreateNewVibeList = () => {
    return (

      <MoodEmojiSelector />
    )
  }

  CurrentPlaylistSad = () => {
    return (
      <div>
        <MusicPlayer playlistLoaded={this.state.playlistLoaded} artistName={this.state.artistName} trackName={this.state.trackName} albumName={this.state.albumName} albumArt={this.state.albumArt} playing={this.state.playing} onPrevClick={this.onPrevClick} onPlayClick={this.onPlayClick} onNextClick={this.onNextClick} />
        <PlaylistContainer currentMood={'sad'} />
      </div>
    )
  }

  CurrentPlaylistContent = () => {
    return (
      <PlaylistContainer currentMood={'content'} />
    )
  }

  CurrentPlaylistEcstatic = () => {
    return (
      <div>
        <MusicPlayer playlistLoaded={this.state.playlistLoaded} artistName={this.state.artistName} trackName={this.state.trackName} albumName={this.state.albumName} albumArt={this.state.albumArt} playing={this.state.playing} onPrevClick={this.onPrevClick} onPlayClick={this.onPlayClick} onNextClick={this.onNextClick} />
        <PlaylistContainer currentMood={'ecstatic'} />
      </div>

    )
  }

  handleIconClick = (event) => {
    event.preventDefault()
    let hamburger = document.getElementById('hamburger');
    if (hamburger.className === "fa fa-bars"){
      hamburger.className = "fa fa-close"
    } else {
      hamburger.className = "fa fa-bars"
    }
    let x = document.getElementById("mobile-nav-bar");
    if (x.className === "mobile-nav-menu") {
      x.className += " show tablet";
    } else {
      x.className = "mobile-nav-menu";
    }
  }

  handleMenuClick = (event) => {
    event.target.className="active"
  }

  handleLogOut = () => {
    this.props.setLoggedInUser(null);
    window.location = 'https://www.spotify.com/logout/';
    window.location = "http://localhost:3000/api/v1/logout";
  }

  renderLogInLogOut = () => {
    if (this.props.loggedInUser !== null) {
      return <p onClick={this.handleLogOut}>Logout</p>
    } else {
      return <Login />
    }
  }

  render() {

    return (
      <div className="page">
        <div className="topnav" id="top-nav-bar">
          <div className="box-1">
            <a href="http://localhost:3001/" onClick={this.handleMenuClick} >Home</a>
            <a href="#my-vibelists" >My VibeLists</a>
            <a href="http://localhost:3001/create" >New VibeList</a>
          </div>

          <div className="box-2" >
          </div>
          <div className="box-3" >
            <Login />
            <a href="" className="icon" onClick={this.handleIconClick}>
              <i id="hamburger" className="fa fa-bars"></i>
            </a>
          </div>
        </div>
        <div  id="mobile-nav-bar" className="mobile-nav-menu">
          <a href="http://localhost:3001/" onClick={this.handleMenuClick} className="mobile-home-button">Home</a>
          <a href="#my-vibelists" >My VibeLists</a>
          <a href="http://localhost:3001/create" >New VibeList</a>
          {this.renderLogInLogOut()}
        </div>


        <Router>
          <div className="content">
            <Route exact path="/" render={this.Login} />
            <Route exact path="/welcome" render={this.Welcome} />
            <Route exact path="/create" render={this.CreateNewVibeList} />
            <Route exact path="/create-sad-vibelist" render={this.CurrentPlaylistSad} />
            <Route exact path="/create-content-vibelist" render={this.CurrentPlaylistContent} />
            <Route exact path="/create-ecstatic-vibelist" render={this.CurrentPlaylistEcstatic} />
            <Route exact path="/my-vibelists" render={this.MyVibeLists} />
          </div>
        </Router>
        <div className="footer">
          <p className="footer-text">created by Sandy Edwards</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInUser: (user) => dispatch(setLoggedInUser(user)),
    fetchLoggedInUser: () => dispatch(fetchLoggedInUser()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchSongs: () => dispatch(fetchSongs()),
    fetchMoods: () => dispatch(fetchMoods()),
    setEcstaticSongs: (songs) => dispatch(setEcstaticSongs(songs)),
    setContentSongs: (songs) => dispatch(setContentSongs(songs)),
    setSadSongs: (songs) => dispatch(setSadSongs(songs)),
    setDeviceId: (id) => dispatch(setDeviceId(id))
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs,
    users: state.users,
    loggedInUser: state.loggedInUser,
    moods: state.moods,
    ecstaticSongs: state.ecstaticSongs,
    contentSongs: state.contentSongs,
    sadSongs: state.sadSongs,
    deviceId: state.deviceId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
