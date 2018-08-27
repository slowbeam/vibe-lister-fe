import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import GenreSelector from './components/GenreSelector'
import { addSongs } from './actions/songs.js'

class App extends Component {

  loadAllData = () => {
    
  }

  componentDidMount(){

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
      <GenreSelector />
      </div>
    );
  }
}

export default App;
