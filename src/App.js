import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import LoginButton from "./components/shared/navBar/loginButton";
import MoodEmojiSelector from "./components/MoodEmojiSelector";
import PlaylistContainer from "./containers/PlaylistContainer";
import MusicPlayer from "./components/MusicPlayer";
import MyVibeListsContainer from "./containers/MyVibeListsContainer";
import { connect } from "react-redux";
import * as actions from "./actions";

import Login from "./components/pages/login/login";
import Welcome from "./components/pages/welcome/welcome";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  setDisplayName = (user) => {
    if (localStorage.getItem("jwt") && this.props.currentUser) {
      this.props.setDisplayName(user);
    }
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

  handleMenuClick = (event) => {
    event.target.className = "active";
  };

  handleLogOut = () => {
    this.props.setCurrentUser(null);
    localStorage.removeItem("jwt");
    window.location = "https://www.spotify.com/logout/";
    window.location = process.env.REACT_APP_BASE_URL;
  };

  renderProfileImage = () => {
    if (this.props.profileImage) {
      return this.props.profileImage;
    } else if (this.props.currentUser.profile_image) {
      return this.props.currentUser.profile_image;
    } else {
      return "./images/avatar-icon.png";
    }
  };

  renderLogInLogOut = () => {
    const jwt = localStorage.getItem("jwt");
    if ((this.props.currentUser !== null) & (jwt !== null)) {
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
    if ((this.props.currentUser !== null) & (jwt !== null)) {
      return <p onClick={this.handleLogOut}>logout</p>;
    } else {
      return <LoginButton />;
    }
  };

  Login = () => {
    const token = localStorage.getItem("jwt");

    if (this.props.currentUser && token) {
      return <Welcome />;
    } else {
      return <Login />;
    }
  };

  Welcome = () => {
    return <Welcome />;
  };

  CreateNewVibeList = () => {
    return <MoodEmojiSelector />;
  };

  CurrentVibelist = () => {
    return (
      <div className="create-page-container">
        <div className="create-page-content">
          <PlaylistContainer />
          <MusicPlayer />
        </div>
      </div>
    );
  };

  MyVibeLists = () => {
    return (
      <div className="my-vibelists-wrapper">
        <MyVibeListsContainer />
        <MusicPlayer />
      </div>
    );
  };

  render() {
    return (
      <div className="page">
        <div className="topnav" id="top-nav-bar">
          <div className="box-1">
            <a
              href={process.env.REACT_APP_BASE_URL}
              onClick={this.handleMenuClick}
            >
              home
            </a>
            <a href={process.env.REACT_APP_BASE_URL + "/my-vibelists"}>
              my vibelists
            </a>
            <a href={process.env.REACT_APP_BASE_URL + "/create"}>
              new vibelist
            </a>
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
          <a
            href={process.env.REACT_APP_BASE_URL}
            onClick={this.handleMenuClick}
            className="mobile-home-button"
          >
            home
          </a>
          <a href={process.env.REACT_APP_BASE_URL + "/my-vibelists"}>
            my vibelists
          </a>
          <a href={process.env.REACT_APP_BASE_URL + "/create"}>new vibelist</a>
          {this.renderLogInLogOutMobile()}
        </div>

        <Router>
          <div className="content">
            <Route exact path="/" render={this.Login} />
            <Route exact path="/welcome" render={this.Welcome} />
            <Route exact path="/create" render={this.CreateNewVibeList} />
            <Route
              exact
              path="/current-vibelist"
              render={this.CurrentVibelist}
            />
            <Route exact path="/my-vibelists" render={this.MyVibeLists} />
          </div>
        </Router>
        <div className="footer">
          <p className="footer-text">created by Sandy Edwards</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    profileImage: state.currentUser.profileImage,
  };
};

export default connect(mapStateToProps, actions)(App);
