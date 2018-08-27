import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login'
import GenreSelector from './Components/GenreSelector'

class App extends Component {

  loadGenres = () => {
    window.location='http://localhost:3000/api/v1/load-genres';
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src='v-sample-logo.png' className="App-logo" alt="logo" />
          <h1 className="App-title">VibeList</h1>
        </header>
      <Login />
      <GenreSelector />
      <button onClick={this.loadGenres}>load genres</button>
      </div>
    );
  }
}

export default App;
