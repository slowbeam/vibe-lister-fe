import React from 'react';

const Login = (props) => {

  const visitSpotifyLogin = () => {
    window.location='https://vibelist-server.herokuapp.com/api/v1/login';
  }

  return (
      <p onClick={visitSpotifyLogin}>login</p>
  )
};


export default Login;
