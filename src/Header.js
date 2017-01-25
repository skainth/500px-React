import React from 'react';

class Header extends React.Component{
  render(){
    const {userDetails, onLogoutClick, onLoginClick} = this.props;
    return <div>{userDetails?<button onClick={onLogoutClick}>Logout {userDetails.name}</button>: <button onClick={onLoginClick}>Login</button>}</div>;
  }
}

export default Header;