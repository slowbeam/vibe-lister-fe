import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import MoodEmojiSelector from './components/MoodEmojiSelector';
import PlaylistContainer from './containers/PlaylistContainer';
import MusicPlayerTwo from './components/MusicPlayerTwo';
import LoginPage from './components/LoginPage';
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
    .then(() => {return this.storeEcstaticMoodLists()})
    .then(() => {return this.storeContentMoodLists()})
    .then(() => {return this.storeSadMoodLists()})
  }

  setDisplayName = (user) => {
    if (localStorage.getItem('jwt') && this.props.currentUser) {
      this.props.setDisplayName(user)
    }
  }

  storeEcstaticMoodLists = () => {
      if (this.props.currentUser !== null){
        const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);

        const userEcstaticMoods = userMoods.filter(mood => mood.name.includes("ecstatic"));

        const ecstaticMoodsArray = [];

        userEcstaticMoods.forEach((e,i) => (i = e.mood_list_id, ecstaticMoodsArray[i] ? ecstaticMoodsArray[i].push(e) : (ecstaticMoodsArray[i] = [e])));

        const ecstaticMoodsNoEmpties = []
        for (let el of ecstaticMoodsArray){
          if (el) {
            ecstaticMoodsNoEmpties.push(el)
          }
        }

        const ecstaticMoodLists = [...ecstaticMoodsNoEmpties];

        for (var i = 0; i < ecstaticMoodLists.length; i++) {

          const newArray = {playlist_uri: "", saved: false, songs: []}

          for (let el of ecstaticMoodLists[i]){
            newArray.playlist_uri = ecstaticMoodLists[i][0].playlist_uri;
            newArray.saved = el.saved;
            let song = this.props.songs.find(song => song.id === el.song_id)
            newArray.songs.push(song)
          }
           ecstaticMoodLists[i] = newArray
        }
          this.props.setEcstaticLists(ecstaticMoodLists)
      }
  }

  storeContentMoodLists = () => {
    if (this.props.currentUser !== null){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);

      const userContentMoods = userMoods.filter(mood => mood.name.includes("content"));

      const contentMoodsArray = [];

      userContentMoods.forEach((e,i) => (i = e.mood_list_id, contentMoodsArray[i] ? contentMoodsArray[i].push(e) : (contentMoodsArray[i] = [e])));

      const contentMoodsNoEmpties = []
      for (let el of contentMoodsArray){
        if (el) {
          contentMoodsNoEmpties.push(el)
        }
      }

      const contentMoodLists = [...contentMoodsNoEmpties];

      for (var i = 0; i < contentMoodLists.length; i++) {

        const newArray = {playlist_uri: "", saved: false, songs: []};

        for (let el of contentMoodLists[i]){
          newArray.playlist_uri = contentMoodLists[i][0].playlist_uri;
          newArray.saved = el.saved;
          let song = this.props.songs.find(song => song.id === el.song_id)
          newArray.songs.push(song)
        }
         contentMoodLists[i] = newArray
      }
        this.props.setContentLists(contentMoodLists)
    }
  }

  storeSadMoodLists = () => {
    if (this.props.currentUser !== null){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.currentUser.id);
      const userSadMoods = userMoods.filter(mood => mood.name.includes("sad"));

      const sadMoodsArray = [];

      userSadMoods.forEach((e,i) => (i = e.mood_list_id, sadMoodsArray[i] ? sadMoodsArray[i].push(e) : (sadMoodsArray[i] = [e])));

      const sadMoodsNoEmpties = []
      for (let el of sadMoodsArray){
        if (el) {
          sadMoodsNoEmpties.push(el)
        }
      }

      const sadMoodLists = [...sadMoodsNoEmpties];

      for (var i = 0; i < sadMoodLists.length; i++) {
        const newArray = {playlist_uri: "", saved: false, songs: []};
        for (let el of sadMoodLists[i]){
          newArray.playlist_uri = sadMoodLists[i][0].playlist_uri;
          newArray.saved = el.saved;
          let song = this.props.songs.find(song => song.id === el.song_id)
          newArray.songs.push(song)
        }
         sadMoodLists[i] = newArray
      }
        this.props.setSadLists(sadMoodLists)
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
    window.location = "https://vibelist.herokuapp.com/";
  }

  renderProfileImage = () => {

    if (this.props.profileImage){
      return this.props.profileImage
    }
    else if (this.props.currentUser.profile_image){
      return this.props.currentUser.profile_image
    }
    else {
      return "./images/avatar-icon.png"
    }
  }

  renderLogInLogOut = () => {
    const jwt = localStorage.getItem('jwt')
    if (this.props.currentUser !== null & jwt !== null) {
      return (
        <div className="avatar-logout">
          <div className="avatar"
            style={{
              backgroundImage: `url(${this.renderProfileImage()})`,
              backgroundSize: "cover",
              height: 60,
              width: 60,
              border: "3px solid #d09ed4",
              borderRadius: "50%",
            }}
          />
        <p onClick={this.handleLogOut}>logout</p>
        </div>
    )

    } else {
      return <Login />
    }
  }

  renderLogInLogOutMobile = () => {
    const jwt = localStorage.getItem('jwt')
    if (this.props.currentUser !== null & jwt !== null) {
      return (
          <p onClick={this.handleLogOut}>logout</p>
    )

    } else {
      return <Login />
    }
  }

  Login = () => {
    const token = localStorage.getItem('jwt');

    if (this.props.currentUser && token ){
      return <WelcomePage />
    }
    else {
      return <LoginPage />
    }

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
        <div className="create-page-content">
          <PlaylistContainer />
          <MusicPlayerTwo />
        </div>
      </div>
    )
  }

  CurrentPlaylistContent = () => {
    return (
      <div className="create-page-container">
        <div className="create-page-content">
          <PlaylistContainer />
          <MusicPlayerTwo />
        </div>
      </div>
    )
  }

  CurrentPlaylistEcstatic = () => {
    return (
      <div className="create-page-container">
        <div className="create-page-content">
          <PlaylistContainer />
          <MusicPlayerTwo />
        </div>
      </div>


    )
  }

  CurrentVibelist = () => {
    return (
      <div className="create-page-container">
        <div className="create-page-content">
          <PlaylistContainer />
          <MusicPlayerTwo />
        </div>
      </div>
    )
  }



  MyVibeLists = () => {
    return (
      <div className="my-vibelists-wrapper">
        <MyVibeListsContainer />
        <MusicPlayerTwo />
      </div>

    )
  }



  render() {
    return (
      <div className="page">
        <div className="topnav" id="top-nav-bar">
          <div className="box-1">
            <Link to="/">home</Link>
            <Link to="/my-vibelists" >my vibelists</Link>
            <Link to="/create" >new vibelist</Link>
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
          <Link to="/" className="mobile-home-button">home</Link>
          <Link to="/my-vibelists" >my vibelists</Link>
          <Link to="/create" >new vibelist</Link>
          {this.renderLogInLogOutMobile()}
        </div>


        <Router>
          <div className="content">
            <Route exact path="/" render={this.Login} />
            <Route exact path="/welcome" render={this.Welcome} />
            <Route exact path="/create" render={this.CreateNewVibeList} />
            <Route exact path='/current-vibelist' render={this.CurrentVibelist} />
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
    profileImage: state.currentUser.profileImage,
    moods: state.moods,
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
    moodListId: state.currentVibelist.mood_list_id
  }
}

export default connect(mapStateToProps, actions)(App);
