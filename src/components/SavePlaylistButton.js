import React from 'react';
import { connect } from 'react-redux';
import StyledButton from './StyledButton';
import * as actions from '../actions';


class SavePlaylistButton extends React.Component {

  componentDidMount(){

  }


    visitCreatePlaylist = () => {

    const token = localStorage.getItem('jwt');

    window.location='http://localhost:3000/api/v1/create-playlist?jwt=' + token;
  }
    render() {
      return(
      <div>
          <StyledButton className="create-new-playlist-button" onClick={this.visitCreatePlaylist}>Add Vibelist To Spotify</StyledButton>
      </div>
      )
    }

}

const mapStateToProps = state => {
  return {
    deviceId: state.deviceId,
    currentUser: state.currentUser.user
  }
}

export default connect(mapStateToProps, actions)(SavePlaylistButton);
