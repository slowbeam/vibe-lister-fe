import React, { Component } from 'react';
import CreatePlaylist from './CreatePlaylist';
import { connect } from 'react-redux';
import { setLoggedInUser } from '../actions/loggedInUser'

class WelcomePage extends Component {

  setUserAndTokenFromQuery = (windowLocation) => {
    const query = windowLocation.search.substring(1);

    const queryPairs = query.split('&');

    let queryObj ={};
    for (var i = 0; i < queryPairs.length; i++) {
        var pair = queryPairs[i].split('=');
        queryObj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    this.props.setLoggedInUser({
      username: queryObj.username,
      display_name: queryObj.display_name.split("+").join(" "),
      profile_image: queryObj.profile_image,
      access_token: queryObj.access_token
    })

    const jwt = queryObj.jwt

    localStorage.setItem('jwt', jwt)
  }

  renderDisplayName = () => {
    if (this.props.loggedInUser && this.props.loggedInUser.display_name) {
      return this.props.loggedInUser.display_name.split(' ')[0]
    } else {
      return ""
    }
  }

  componentDidMount(){
    this.setUserAndTokenFromQuery(window.location)
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
    setLoggedInUser: (user) =>  dispatch(setLoggedInUser(user))
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
