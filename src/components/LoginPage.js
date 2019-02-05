import React from "react";
import StyledButton from "./StyledButton";

const LoginPage = props => {
  const visitSpotifyLogin = () => {
    window.location = "https://vibelist-server.herokuapp.com/api/v1/login";
  };

  return (
    <div className="login-page-container">
      <p>please login to use vibelist</p>
      <StyledButton onClick={visitSpotifyLogin}>Login</StyledButton>
    </div>
  );
};

export default LoginPage;
