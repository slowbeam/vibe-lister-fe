import React from 'react';

const Login = (props) => {
  const visitSpotifyLogin = () => {
    window.location=`${process.env.REACT_APP_API_BASE_URL}/api/v1/login`;
  }

  return (
      <p onClick={visitSpotifyLogin}>login</p>
  )
};


export default Login;
