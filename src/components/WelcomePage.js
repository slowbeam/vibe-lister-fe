import React, { Component } from 'react';
import CreatePlaylist from './CreatePlaylist';
import { connect } from 'react-redux';
import * as actions from '../actions';


class WelcomePage extends Component {


  componentDidMount() {
    this.props.LogInUser(window.location)
  }

  render(){
    return (
      <div className="section welcome">
        <h3>Welcome to Vibelist, {this.props.displayName}!</h3>
        <h4> VibeList is an app for creating Spotify playlists based on the mood of your choice</h4>
        <CreatePlaylist />
      </div>
    )
  }
};


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user,
    displayName: state.currentUser.displayName
  }
}

export default connect(mapStateToProps, actions)(WelcomePage);
