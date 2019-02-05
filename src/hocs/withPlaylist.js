import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const withPlaylist = WrappedComponent => {
  class AuthorizedComponent extends React.Component {
    loadPlaylistFromUrl = () => {
      if (window.location.search && this.props.deviceId !== null) {
        const query = window.location.search.substring(1);
        const pair = query.split("=");
        const playlistUri = pair[1];
        this.props.setCurrentPlaylist(playlistUri);
      }
    };

    componentDidMount() {
      this.loadPlaylistFromUrl();
    }
    render() {
      if (this.props.currentPlaylist) {
        return <WrappedComponent />;
      } else {
        return <React.Fragment />;
      }
    }
  }
  return connect(
    mapStateToProps,
    actions
  )(AuthorizedComponent);
};

const mapStateToProps = state => {
  return {
    currentPlaylist: state.currentPlaylist
  };
};

export default withPlaylist;
