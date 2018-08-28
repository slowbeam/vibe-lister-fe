import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import MoodSelector from './components/MoodSelector'
import PlaylistContainer from './containers/PlaylistContainer'
import { connect } from 'react-redux'
import { addSong } from './actions/songs.js'

class App extends Component {

  addAllSongs = (songArray) => {
    for (let song of songArray) {
      this.props.addSong(song)
    }
  }

  findLoggedInUser = (userArray) => {
    return userArray.filter(user => user.logged_in === true)
  }

  setLoggedInUser = () => {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(resp => { this.findLoggedInUser(resp) })
  }

  loadAllData = () => {
    fetch('http://localhost:3000/api/v1/songs')
    .then(resp => resp.json())
    .then(resp => {this.addAllSongs(resp)})
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSong: (song) => dispatch(addSong(song))
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
