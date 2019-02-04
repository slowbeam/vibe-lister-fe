import React, { Component } from 'react';
import CreatePlaylist from './CreatePlaylist';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions';



class NavBar extends Component {


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
    currentUser: state.currentUser.user,
    displayName: state.currentUser.displayName
  }
}

export default connect(mapStateToProps, actions)(NavBar);
