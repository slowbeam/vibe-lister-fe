import React from 'react';
import Button from '@material-ui/core/Button';

const LoginPage = (props) => {

  const visitSpotifyLogin = () => {
    window.location='http://localhost:3000/api/v1/login';
  }

  return (
    <div className="login-page-container">
      <p>please login to use vibelist</p>
      <Button onClick={visitSpotifyLogin} >Login</Button>
    </div>
  )
};


export default LoginPage;
