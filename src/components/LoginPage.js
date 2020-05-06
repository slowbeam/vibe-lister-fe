import React from 'react';
import StyledButton from './StyledButton';

const LoginPage = (props) => {
  const visitSpotifyLogin = () => {
    window.location=`${process.env.REACT_APP_API_BASE_URL}/api/v1/login`;
  }

  return (
    <div className="login-page-container">
      <p>please login to use vibelist</p>
      <StyledButton onClick={visitSpotifyLogin} >Login</StyledButton>
    </div>
  )
};


export default LoginPage;
