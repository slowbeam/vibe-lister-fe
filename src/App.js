import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import MoodEmojiSelector from './components/MoodEmojiSelector';
import PlaylistContainer from './containers/PlaylistContainer';
import MusicPlayer from './components/MusicPlayer';
import WelcomePage from './components/WelcomePage';
import MyVibeListsContainer from './containers/MyVibeListsContainer';
import { connect } from 'react-redux';
import * as actions from './actions';




class App extends Component {

  componentDidMount(){
    this.storeAllData()
  }

  storeAllData = () => {
    this.props.fetchSongs()
    .then(() => {return this.props.fetchCurrentUser()})
    .then(() => {return this.props.fetchMoods()})
    .then(() => {return this.props.fetchUsers()})
    .then(() => {return this.storeEcstaticSongs()})
    .then(() => {return this.storeContentSongs()})
    .then(() => {return this.storeSadSongs()})
  }

  storeEcstaticSongs = () => {
      if (this.props.currentUser !== null){
        const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);
        const userEcstaticMoods = userMoods.filter(mood => mood.name.includes("ecstatic"));
        const userEcstaticSongIds = userEcstaticMoods.map(mood => mood.song_id)
        const userEcstaticSongs = this.props.songs.filter(song => userEcstaticSongIds.includes(song.id))
        this.props.setEcstaticSongs(userEcstaticSongs)
      }

  }

  storeContentSongs = () => {
    if (this.props.currentUser !== null){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);
      const userContentMoods = userMoods.filter(mood => mood.name.includes("content"));
      const userContentSongIds = userContentMoods.map(mood => mood.song_id)
      const userContentSongs = this.props.songs.filter(song => userContentSongIds.includes(song.id))
      this.props.setContentSongs(userContentSongs)
    }
  }

  storeSadSongs = () => {
    if (this.props.currentUser !== null){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);
      const userSadMoods = userMoods.filter(mood => mood.name.includes("sad"));
      const userSadSongIds = userSadMoods.map(mood => mood.song_id)
      const userSadSongs = this.props.songs.filter(song => userSadSongIds.includes(song.id))
      this.props.setSadSongs(userSadSongs)
    }
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
    this.props.setCurrentUser(null);
    localStorage.removeItem('jwt');
    window.location = 'https://www.spotify.com/logout/';
    window.location = "http://localhost:3001/";
  }

  renderLogInLogOut = () => {
    const jwt = localStorage.getItem('jwt')
    if (this.props.currentUser !== null & jwt !== null) {
      return <p onClick={this.handleLogOut}>Logout</p>
    } else {
      return <Login />
    }
  }

  visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }

  Login = () => {
    return (
      <div className="login-page-container">
        <h3>please login to use vibelist</h3>
        <button onClick={this.visitSpotifyLogin} >Login</button>
      </div>
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
      <div className="create-page-container">
        <MusicPlayer />
        <PlaylistContainer />
      </div>
    )
  }

  CurrentPlaylistContent = () => {
    return (
      <div className="create-page-container">
      <MusicPlayer />
      <PlaylistContainer currentMood={'content'} />
      </div>
    )
  }

  CurrentPlaylistEcstatic = () => {
    return (
      <div className="create-page-container">
        <MusicPlayer />
        <PlaylistContainer />
      </div>

    )
  }

  MyVibeLists = () => {
    return (
      <div className="create-page-container">
        <MusicPlayer />
        <MyVibeListsContainer />
      </div>

    )
  }



  render() {

    return (
      <div className="page">
        <div className="topnav" id="top-nav-bar">
          <div className="box-1">
            <a href="http://localhost:3001/" onClick={this.handleMenuClick} >Home</a>
            <a href="http://localhost:3001/my-vibelists" >My VibeLists</a>
            <a href="http://localhost:3001/create" >New VibeList</a>
          </div>

          <div className="box-2" >
          </div>
          <div className="box-3" >
            {this.renderLogInLogOut()}
            <a href="" className="icon" onClick={this.handleIconClick}>
              <i id="hamburger" className="fa fa-bars"></i>
            </a>
          </div>
        </div>
        <div  id="mobile-nav-bar" className="mobile-nav-menu">
          <a href="http://localhost:3001/" onClick={this.handleMenuClick} className="mobile-home-button">Home</a>
          <a href="http://localhost:3001/my-vibelists" >My VibeLists</a>
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

const mapStateToProps = state => {
  return {
    songs: state.songs,
    users: state.users,
    currentUser: state.currentUser.user,
    moods: state.moods,
    ecstaticSongs: state.ecstaticSongs,
    contentSongs: state.contentSongs,
    sadSongs: state.sadSongs
  }
}

export default connect(mapStateToProps, actions)(App);
