import React, { Component } from 'react';
import CreatePlaylist from './CreatePlaylist';
import { connect } from 'react-redux';
import * as actions from '../actions';

class WelcomePage extends Component {


  renderDisplayName = () => {
    if (this.props.currentUser && this.props.currentUser.display_name) {
      return this.props.currentUser.display_name.split(' ')[0]
    } else {
      return ""
    }
  }

  componentDidMount(){
    this.props.LogInUser(window.location)
  }

  render(){
    return (
      <div className="section welcome">
        <h3>Welcome to Vibelist, {this.renderDisplayName()}!</h3>
        <h4> VibeList is an app for creating Spotify playlists based on the mood of your choice</h4>
        <CreatePlaylist />

      </div>
    )
  }
};


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user
  }
}

export default connect(mapStateToProps, actions)(WelcomePage);
