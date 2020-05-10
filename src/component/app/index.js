import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../actions";

import Create from "../page/create";
import Login from "../page/login";
import MyVibeLists from "../page/myVibelists";
import NavBar from "../shared/navBar";
import Vibelist from "../page/vibelist";
import Welcome from "../page/welcome";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  setDisplayName = (user) => {
    if (localStorage.getItem("jwt") && this.props.currentUser) {
      this.props.setDisplayName(user);
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

  render() {
    return (
      <div className="page">
        <NavBar />
        <Router>
          <div className="content">
            <Route exact path="/" render={this.Login} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/current-vibelist" component={Vibelist} />
            <Route exact path="/my-vibelists" component={MyVibeLists} />
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
    songs: state.songs,
    users: state.users,
    currentUser: state.currentUser.user,
    profileImage: state.currentUser.profileImage,
    moods: state.moods,
    sadLists: state.moodLists.sadLists,
    contentLists: state.moodLists.contentLists,
    ecstaticLists: state.moodLists.ecstaticLists,
  };
};

export default connect(mapStateToProps, actions)(App);
