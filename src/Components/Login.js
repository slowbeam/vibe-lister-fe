import React from 'react';

const Login = (props) => {

  const visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }

  return (
      <p onClick={visitSpotifyLogin}>login</p>
  )
};


export default Login;
