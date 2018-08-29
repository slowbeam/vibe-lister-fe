import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import MoodSelector from './components/MoodSelector'
import PlaylistContainer from './containers/PlaylistContainer'
import { connect } from 'react-redux'
import { addSong } from './actions/songs'
import { setUsers } from './actions/users'
import { setLoggedInUser } from './actions/loggedInUser'
import { setMoods } from './actions/moods'


class App extends Component {

  fetchAllSongs = (songArray) => {
    for (let song of songArray) {
      this.props.addSong(song)
    }
  }

  fetchAllUsers = () => {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(resp => this.props.setUsers(resp))
  }

  fetchAllMoods = () => {
    fetch('http://localhost:3000/api/v1/moods')
    .then(resp => resp.json())
    .then(resp => this.props.setMoods(resp))
  }

  findAndSetLoggedInUser = (userArray) => {
    const foundUser =  userArray.filter(user => user.logged_in === true)
    this.props.setLoggedInUser(foundUser)
  }

  fetchLoggedInUser = () => {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(resp => {this.findAndSetLoggedInUser(resp)})
  }

  loadAllData = () => {
    fetch('http://localhost:3000/api/v1/songs')
    .then(resp => resp.json())
    .then(resp => {this.fetchAllSongs(resp)})
    .then(() => {return this.fetchAllUsers()})
    .then(() => {return this.fetchLoggedInUser()})
    .then(() => {return this.fetchAllMoods()})

  }

  componentDidMount(){
    this.loadAllData()
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
      {console.log(this.props.moods)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSong: (song) => dispatch(addSong(song)),
    setUsers: (users) => dispatch(setUsers(users)),
    setLoggedInUser: (user) => dispatch(setLoggedInUser(user)),
    setMoods: (moods) => dispatch(setMoods(moods))
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs,
    users: state.users,
    loggedInUser: state.loggedInUser,
    moods: state.moods
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
