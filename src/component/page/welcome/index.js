import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { logInUser } from "../../../utils/user";
import StyledButton from "../../shared/buttons/styledButton";

class Welcome extends Component {
  componentDidMount() {
    logInUser(window.location);
  }

  renderWelcomeMessage = () => {
    if (this.props.displayName) {
      return <h3>welcome to vibelist, {this.props.displayName}!</h3>;
    } else {
      return <h3>welcome to vibelist!</h3>;
    }
  };

  render() {
    return (
      <div className="section welcome">
        {this.renderWelcomeMessage()}
        <h4>
          vibelist is an app for creating Spotify playlists based on the mood of
          your choice.
        </h4>
        <StyledButton
          className="create-new-playlist-button"
          link="/create"
          text="Create a New VibeList"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    displayName: state.currentUser.displayName,
  };
};

export default connect(mapStateToProps, actions)(Welcome);
