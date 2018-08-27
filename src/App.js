import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import GenreSelector from './Components/GenreSelector'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='v-sample-logo.png' className="App-logo" alt="logo" />
          <h1 className="App-title">VibeList</h1>
        </header>
      <Login />
      <GenreSelector />
      </div>
    );
  }
}

export default App;
