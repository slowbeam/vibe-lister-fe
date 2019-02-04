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
