import React from 'react';
import {Link} from 'react-router';

// import logo from '../500px.svg';
import '../App.css';

class Header extends React.Component{
  loggedInLinks(userDetails, onLogoutClick){
    return (
      <span>
        <Link to="/favorites">Favorites</Link>
        <a href="#" className="menuItem" onClick={onLogoutClick} title={"logout " + userDetails.name}>Logout</a>
      </span>);
  }
  render(){
    const {userDetails, onLogoutClick, onLoginClick} = this.props;
    return (
      <div>
        <div className="App-header">
          <img  className="App-logo" alt="logo" />
        </div>
        <div className="menu">
          <Link to="/" className="menuItem">Home</Link>
          <Link to="/popular" className="menuItem">Popular</Link>
          {userDetails?
            this.loggedInLinks(userDetails, onLogoutClick): 
            <a href="#" className="menuItem" onClick={onLoginClick}>Login</a>
          }
        </div>

      </div>
    );
  }
}

export default Header;