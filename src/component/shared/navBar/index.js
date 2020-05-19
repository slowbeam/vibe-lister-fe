import React, { Component } from "react";
import LoginButton from "./loginButton";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../actions";

class NavBar extends Component {
  renderLogInLogOut = () => {
    const jwt = localStorage.getItem("jwt");
    if (this.props.currentUser !== null && jwt !== null) {
      return (
        <div className="avatar-logout">
          <div
            className="avatar"
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
      );
    } else {
      return <LoginButton />;
    }
  };

  renderLogInLogOutMobile = () => {
    const jwt = localStorage.getItem("jwt");
    if (this.props.currentUser !== null && jwt !== null) {
      return <p onClick={this.handleLogOut}>logout</p>;
    } else {
      return <LoginButton />;
    }
  };

  renderProfileImage = () => {
    const {
      currentUser: { profile_image },
    } = this.props;

    return profile_image ? profile_image : "./images/avatar-icon.png";
  };

  handleIconClick = (event) => {
    event.preventDefault();
    let hamburger = document.getElementById("hamburger");
    if (hamburger.className === "fa fa-bars") {
      hamburger.className = "fa fa-close";
    } else {
      hamburger.className = "fa fa-bars";
    }
    let x = document.getElementById("mobile-nav-bar");
    if (x.className === "mobile-nav-menu") {
      x.className += " show tablet";
    } else {
      x.className = "mobile-nav-menu";
    }
  };

  handleLogOut = () => {
    this.props.setCurrentUser(null);
    localStorage.removeItem("jwt");
    window.location = "https://www.spotify.com/logout/";
    window.location = process.env.REACT_APP_BASE_URL;
  };

  handleMenuClick = (event) => {
    event.target.className = "active";
  };

  render() {
    return (
      <>
        <div className="topnav" id="top-nav-bar">
          <div className="box-1">
            <Link to="/" onClick={this.handleMenuClick}>
              home
            </Link>
            <Link to="/my-vibelists">my vibelists</Link>
            <Link to="/create">new vibelist</Link>
          </div>
          <div className="box-2"></div>
          <div className="box-3">
            {this.renderLogInLogOut()}
            <div className="icon" onClick={this.handleIconClick}>
              <i id="hamburger" className="fa fa-bars"></i>
            </div>
          </div>
        </div>
        <div id="mobile-nav-bar" className="mobile-nav-menu">
          <Link
            to="/"
            onClick={this.handleMenuClick}
            className="mobile-home-button"
          >
            home
          </Link>
          <Link to="/my-vibelists">my vibelists</Link>
          <Link to="/create">new vibelist</Link>
          {this.renderLogInLogOutMobile()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    users: state.users,
    currentUser: state.currentUser.user,
    profileImage: state.currentUser.profileImage,
    moods: state.moods,
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
    moodListId: state.currentVibelist.mood_list_id,
  };
};

export default connect(mapStateToProps, actions)(NavBar);
