import React, { Component } from 'react';
import CreatePlaylist from './CreatePlaylist';
import { connect } from 'react-redux';
import * as actions from '../actions';



class WelcomePage extends Component {

  componentWillMount() {
    if (this.props.isPlayer) {
      this.props.setIsPlayer(false);
    }
  }

  componentDidMount() {
    this.props.LogInUser(window.location)
  }

  renderWelcomeMessage = () => {
    if (this.props.displayName) {
      return <h3>welcome to vibelist, {this.props.displayName}!</h3>
    } else {
      return <h3>welcome to vibelist!</h3>
    }
  }

  render(){
    return (
      <div className="section welcome">
        {this.renderWelcomeMessage()}
        <h4> vibelist is an app for creating Spotify playlists based on the mood of your choice.</h4>
        <CreatePlaylist />
      </div>
    )
  }
};


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user,
    displayName: state.currentUser.displayName,
    isPlayer: state.audioPlayer.isPlayer
  }
}

export default connect(mapStateToProps, actions)(WelcomePage);
