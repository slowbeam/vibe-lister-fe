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

import "./styles.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
    this.storeAllData();
  }

  storeAllData = () => {
    if (this.props.currentUser) {
      this.props
        .fetchSongs()
        .then(() => {
          return this.props.fetchMoods();
        })
        .then(() => {
          return this.props.fetchUsers();
        })
        .then(() => {
          return this.storeEcstaticMoodLists();
        })
        .then(() => {
          return this.storeContentMoodLists();
        })
        .then(() => {
          return this.storeSadMoodLists();
        });
    }
  };

  storeEcstaticMoodLists = () => {
    if (this.props.currentUser !== null) {
      const userMoods = this.props.moods.filter(
        (mood) => mood.user_id === this.props.currentUser.id
      );

      const userEcstaticMoods = userMoods.filter((mood) =>
        mood.name.includes("ecstatic")
      );

      const ecstaticMoodsArray = [];

      userEcstaticMoods.forEach(
        (e, i) => (
          (i = e.mood_list_id),
          ecstaticMoodsArray[i]
            ? ecstaticMoodsArray[i].push(e)
            : (ecstaticMoodsArray[i] = [e])
        )
      );

      const ecstaticMoodsNoEmpties = [];
      for (let el of ecstaticMoodsArray) {
        if (el) {
          ecstaticMoodsNoEmpties.push(el);
        }
      }

      const ecstaticMoodLists = [...ecstaticMoodsNoEmpties];

      for (var i = 0; i < ecstaticMoodLists.length; i++) {
        const newArray = { playlist_uri: "", saved: false, songs: [] };

        for (let el of ecstaticMoodLists[i]) {
          newArray.playlist_uri = ecstaticMoodLists[i][0].playlist_uri;
          newArray.saved = el.saved;
          let song = this.props.songs.find((song) => song.id === el.song_id);
          newArray.songs.push(song);
        }
        ecstaticMoodLists[i] = newArray;
      }
      this.props.setEcstaticLists(ecstaticMoodLists);
    }
  };

  storeContentMoodLists = () => {
    if (this.props.currentUser !== null) {
      const userMoods = this.props.moods.filter(
        (mood) => mood.user_id === this.props.currentUser.id
      );

      const userContentMoods = userMoods.filter((mood) =>
        mood.name.includes("content")
      );

      const contentMoodsArray = [];

      userContentMoods.forEach(
        (e, i) => (
          (i = e.mood_list_id),
          contentMoodsArray[i]
            ? contentMoodsArray[i].push(e)
            : (contentMoodsArray[i] = [e])
        )
      );

      const contentMoodsNoEmpties = [];
      for (let el of contentMoodsArray) {
        if (el) {
          contentMoodsNoEmpties.push(el);
        }
      }

      const contentMoodLists = [...contentMoodsNoEmpties];

      for (var i = 0; i < contentMoodLists.length; i++) {
        const newArray = { playlist_uri: "", saved: false, songs: [] };

        for (let el of contentMoodLists[i]) {
          newArray.playlist_uri = contentMoodLists[i][0].playlist_uri;
          newArray.saved = el.saved;
          let song = this.props.songs.find((song) => song.id === el.song_id);
          newArray.songs.push(song);
        }
        contentMoodLists[i] = newArray;
      }
      this.props.setContentLists(contentMoodLists);
    }
  };

  storeSadMoodLists = () => {
    if (this.props.currentUser !== null) {
      const userMoods = this.props.moods.filter(
        (mood) => mood.user_id === this.props.currentUser.id
      );
      const userSadMoods = userMoods.filter((mood) =>
        mood.name.includes("sad")
      );

      const sadMoodsArray = [];

      userSadMoods.forEach(
        (e, i) => (
          (i = e.mood_list_id),
          sadMoodsArray[i] ? sadMoodsArray[i].push(e) : (sadMoodsArray[i] = [e])
        )
      );

      const sadMoodsNoEmpties = [];
      for (let el of sadMoodsArray) {
        if (el) {
          sadMoodsNoEmpties.push(el);
        }
      }

      const sadMoodLists = [...sadMoodsNoEmpties];

      for (var i = 0; i < sadMoodLists.length; i++) {
        const newArray = { playlist_uri: "", saved: false, songs: [] };
        for (let el of sadMoodLists[i]) {
          newArray.playlist_uri = sadMoodLists[i][0].playlist_uri;
          newArray.saved = el.saved;
          let song = this.props.songs.find((song) => song.id === el.song_id);
          newArray.songs.push(song);
        }
        sadMoodLists[i] = newArray;
      }
      this.props.setSadLists(sadMoodLists);
    }
  };

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
