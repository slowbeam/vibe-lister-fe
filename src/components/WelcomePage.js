import React, { Component } from 'react';
import CreatePlaylist from './CreatePlaylist';
import { connect } from 'react-redux';
import { LogInUser } from '../actions/logInUser';
import withAuth from '../hocs/withAuth';

class WelcomePage extends Component {


  renderDisplayName = () => {
    if (this.props.currentUser && this.props.currentUser.display_name) {
      return this.props.currentUser.display_name.split(' ')[0]
    } else {
      return ""
    }
  }

  componentDidMount(){
    this.props.logInUser(window.location)
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

const mapDispatchToProps = dispatch => {
  return {
    logInUser: (windowLocation) => dispatch(LogInUser(windowLocation))
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(WelcomePage));
