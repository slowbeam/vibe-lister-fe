import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import MoodSelector from './components/MoodSelector';
import PlaylistContainer from './containers/PlaylistContainer';
import { connect } from 'react-redux';
import { setLoggedInUser } from './actions/loggedInUser';
import { setEcstaticSongs } from './actions/ecstaticSongs';
import { fetchUsers } from './actions/fetchUsers';
import { fetchSongs } from './actions/fetchSongs';
import { fetchMoods } from './actions/fetchMoods'


class App extends Component {



  findAndSetLoggedInUser = () => {
    const foundUser =  this.props.users.filter(user => user.logged_in === true)
    this.props.setLoggedInUser(foundUser)
  }

  storeEcstaticSongs = () => {
    const userMoods = this.props.moods.filter(mood => mood.user_id === this.props.loggedInUser.id);
    const userEcstaticMoods = userMoods.filter(mood => mood.name.includes("ecstatic"))
    const userEcstaticSongIds = userEcstaticMoods.map(mood => mood.song_id)
    const userEcstaticSongs = this.props.songs.filter(song => userEcstaticSongIds.includes(song.id))
    this.props.setEcstaticSongs(userEcstaticSongs)
  }

  storeAllData = () => {
    this.props.fetchSongs()
    .then(() => {return this.props.fetchUsers()})
    .then(() => {return this.findAndSetLoggedInUser()})
    .then(() => {return this.props.fetchMoods()})

  }

  componentDidMount(){
    this.storeAllData()
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src='v-sample-logo.png' className="App-logo" alt="logo" />
          <h1 className="App-title">VibeList</h1>
        </header>
      <Login />
      <br />
      <MoodSelector />
      <PlaylistContainer />
      {console.log(this.props.loggedInUser)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInUser: (user) => dispatch(setLoggedInUser(user)),
    setEcstaticSongs: (songs) => dispatch(setEcstaticSongs(songs)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchSongs: () => dispatch(fetchSongs()),
    fetchMoods: () => dispatch(fetchMoods())
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs,
    users: state.users,
    loggedInUser: state.loggedInUser,
    moods: state.moods,
    ecstaticSongs: state.ecstaticSongs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
