import React from 'react';
import {Link} from 'react-router';

import logo from '../500px.svg';
import '../App.css';

class Header extends React.Component{
  render(){
    const {userDetails, onLogoutClick, onLoginClick} = this.props;
    console.log("userDetails", userDetails)
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="menu">
          <Link to="/" className="menuItem">Home</Link>
          <Link to="/popular" className="menuItem">Popular</Link>
          {userDetails?
            <a href="#" className="menuItem" onClick={onLogoutClick} title={"logout " + userDetails.name}>Logout</a>: 
            <a href="#" className="menuItem" onClick={onLoginClick}>Login</a>}
        </div>
      </div>
    );
  }
}

export default Header;