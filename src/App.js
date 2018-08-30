import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import MoodEmojiSelector from './components/MoodEmojiSelector';
import PlaylistContainer from './containers/PlaylistContainer';
import CreatePlaylist from './components/CreatePlaylist'
import { connect } from 'react-redux';
import { setLoggedInUser } from './actions/loggedInUser';
import { fetchUsers } from './actions/fetchUsers';
import { fetchSongs } from './actions/fetchSongs';
import { fetchMoods } from './actions/fetchMoods';
import { setEcstaticSongs } from './actions/ecstaticSongs';
import { setContentSongs } from './actions/contentSongs';
import { setSadSongs } from './actions/sadSongs';


class App extends Component {



  findAndSetLoggedInUser = () => {
    const foundUser =  this.props.users.filter(user => user.logged_in === true)
    this.props.setLoggedInUser(foundUser)
  }

  storeEcstaticSongs = () => {
    if (this.props.loggedInUser){
      const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.loggedInUser[0].id);
      const userEcstaticMoods = userMoods.filter(mood => mood.name.includes("ecstatic"));
      const userEcstaticSongIds = userEcstaticMoods.map(mood => mood.song_id)
      const userEcstaticSongs = this.props.songs.filter(song => userEcstaticSongIds.includes(song.id))
      this.props.setEcstaticSongs(userEcstaticSongs)
  }

  }

  storeContentSongs = () => {
    const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.loggedInUser[0].id);
    const userContentMoods = userMoods.filter(mood => mood.name.includes("content"));
    const userContentSongIds = userContentMoods.map(mood => mood.song_id)
    const userContentSongs = this.props.songs.filter(song => userContentSongIds.includes(song.id))
    this.props.setContentSongs(userContentSongs)
  }

  storeSadSongs = () => {
    const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.loggedInUser[0].id);
    const userSadMoods = userMoods.filter(mood => mood.name.includes("sad"));
    const userSadSongIds = userSadMoods.map(mood => mood.song_id)
    const userSadSongs = this.props.songs.filter(song => userSadSongIds.includes(song.id))
    this.props.setSadSongs(userSadSongs)
  }


  storeAllData = () => {
    this.props.fetchSongs()
    .then(() => {return this.props.fetchMoods()})
    .then(() => {return this.props.fetchUsers()})
    .then(() => {return this.findAndSetLoggedInUser()})
    .then(() => {return this.storeEcstaticSongs()})
    .then(() => {return this.storeContentSongs()})
    .then(() => {return this.storeSadSongs()})


  }

  componentDidMount(){
    this.storeAllData()
  }

  Login = () => {
    return (
      <Login />
    )
  }

  Welcome = () => {
    return (
      <div>
        <CreatePlaylist />
        <h4>Welcome to Vibelist, an app for creating Spotify playlists based on the mood of your choice</h4>
      </div>
    )
  }

  CreateNewVibeList = () => {
    return (
      <MoodEmojiSelector />
    )
  }

  CurrentPlaylistSad = () => {
    return (
      <PlaylistContainer currentMood={'sad'} />
    )
  }

  CurrentPlaylistContent = () => {
    return (
      <PlaylistContainer currentMood={'content'} />
    )
  }

  CurrentPlaylistEcstatic = () => {
    return (
      <PlaylistContainer currentMood={'ecstatic'} />
    )
  }

  render() {

    return (
      <div className="page">
        <div className="section menu"></div>
        <div className="section header"></div>
      <Router>
        <React.Fragment>
          <Route exact path="/" render={this.Login} />
          <Route exact path="/welcome" render={this.Welcome} />
          <Route exact path="/create" render={this.CreateNewVibeList} />
          <Route exact path="/create-sad-vibelist" render={this.CurrentPlaylistSad} />
          <Route exact path="/create-content-vibelist" render={this.CurrentPlaylistContent} />
          <Route exact path="/create-ecstatic-vibelist" render={this.CurrentPlaylistContent} />
          <Route exact path="/my-vibelists" render={this.MyVibeLists} />
        </React.Fragment>
      </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInUser: (user) => dispatch(setLoggedInUser(user)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchSongs: () => dispatch(fetchSongs()),
    fetchMoods: () => dispatch(fetchMoods()),
    setEcstaticSongs: (songs) => dispatch(setEcstaticSongs(songs)),
    setContentSongs: (songs) => dispatch(setContentSongs(songs)),
    setSadSongs: (songs) => dispatch(setSadSongs(songs))
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
    sadSongs: state.sadSongs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
