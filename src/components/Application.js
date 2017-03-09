import React from 'react';
import Header from './Header';
import action from '../action';

import {connect} from 'react-redux';

import {_500pxConfig as _500pxConfig}   from '../constant';

/* global _500px */

class Application extends React.Component{
  refreshToken(){
    const self = this;
    _500px.api('/users', (response) => {
      const user = response.data.user;
      self.props.dispatch(action.login({id:user.id, name: user.username}));
    });
  }
  componentDidMount(){  
  const self = this;  
    _500px.init({
      sdk_key: _500pxConfig.SDK_KEY
    });
    _500px.on('authorization_obtained', function () {
      // console.log("500px authorization_obtained", arguments)
    });
    _500px.on('logout', function () {
      console.log("logout", arguments)
    });
    _500px.getAuthorizationStatus( (status) => {
     if(status === "authorized")
      self.refreshToken();
    });
  }
  render(){
    const self = this;
    const {userDetails} = this.props;
    return (
      <div className="App">
        <Header  
          userDetails={userDetails}
          onLogoutClick={(e) => {
            e.preventDefault();
            _500px.logout();
            this.props.dispatch(action.logout())}
          }
          onLoginClick={(e) => {
            e.preventDefault();
            _500px.ensureAuthorization(self.refreshToken.bind(self));
          }}
        />
        {this.props.children}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {userDetails: state.userDetails};
}
export default connect(mapStateToProps)(Application);