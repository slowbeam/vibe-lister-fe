import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetchCurrentUser } from '../actions/fetchCurrentUser';

const withAuth = WrappedComponent => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      if (localStorage.getItem('jwt') && !this.props.loggedIn)
      this.props.fetchCurrentUser()
    }
    render(){
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent />
      } else {
        //return <Redirect to="/login" />
      }
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps)(AuthorizedComponent)
}

const mapStateToProps = state => {
  return {
    loggedIn: state.currentUser.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  fetchCurrentUser: () => dispatch(fetchCurrentUser())
}
