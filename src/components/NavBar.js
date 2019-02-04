import React, { Component } from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions';



class NavBar extends Component {

  renderLogInLogOut = () => {
    const jwt = localStorage.getItem('jwt')
    if (this.props.currentUser !== null & jwt !== null) {
      return (
        <div className="avatar-logout">
          <div className="avatar"
            style={{
              backgroundImage: `url(${this.renderProfileImage()})`,
              backgroundSize: "cover",
              height: 60,
              width: 60,
              border: "3px solid #d09ed4",
              borderRadius: "50%",
            }}
          />
        <p onClick={this.handleLogOut}>logout</p>
        </div>
    )

    } else {
      return <Login />
    }
  }

  renderLogInLogOutMobile = () => {
    const jwt = localStorage.getItem('jwt')
    if (this.props.currentUser !== null & jwt !== null) {
      return (
          <p onClick={this.handleLogOut}>logout</p>
    )

    } else {
      return <Login />
    }
  }

  renderProfileImage = () => {

    if (this.props.profileImage){
      return this.props.profileImage
    }
    else if (this.props.currentUser.profile_image){
      return this.props.currentUser.profile_image
    }
    else {
      return "./images/avatar-icon.png"
    }
  }

  handleIconClick = (event) => {
    event.preventDefault()
    let hamburger = document.getElementById('hamburger');
    if (hamburger.className === "fa fa-bars"){
      hamburger.className = "fa fa-close"
    } else {
      hamburger.className = "fa fa-bars"
    }
    let x = document.getElementById("mobile-nav-bar");
    if (x.className === "mobile-nav-menu") {
      x.className += " show tablet";
    } else {
      x.className = "mobile-nav-menu";
    }
  }

  render(){
    return (
      <React.Fragment>
        <div className="topnav" id="top-nav-bar">
          <div className="box-1">
            <Link to="/">home</Link>
            <Link to="/my-vibelists" >my vibelists</Link>
            <Link to="/create" >new vibelist</Link>
          </div>

          <div className="box-2" >
          </div>
          <div className="box-3" >
            {this.renderLogInLogOut()}
            <a href="" className="icon" onClick={this.handleIconClick}>
              <i id="hamburger" className="fa fa-bars"></i>
            </a>
          </div>
        </div>
        <div  id="mobile-nav-bar" className="mobile-nav-menu">
          <Link to="/" className="mobile-home-button">home</Link>
          <Link to="/my-vibelists" >my vibelists</Link>
          <Link to="/create" >new vibelist</Link>
          {this.renderLogInLogOutMobile()}
        </div>
      </React.Fragment>
    )
  }
};


const mapStateToProps = state => {
  return {
    songs: state.songs,
    users: state.users,
    currentUser: state.currentUser.user,
    profileImage: state.currentUser.profileImage,
    moods: state.moods,
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
    moodListId: state.currentVibelist.mood_list_id
  }
}

export default connect(mapStateToProps, actions)(NavBar);
