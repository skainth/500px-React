import React from 'react';

class Header extends React.Component{
  render(){
    const {userDetails} = this.props;
    return <div>{userDetails?<button>Logout {userDetails.name}</button>: <button>Login</button>}</div>;
  }
}

export default Header;