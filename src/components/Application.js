import React from 'react';
import Header from './Header';
import action from '../action';

import {connect} from 'react-redux';

import {_500px as _500pxConfig}   from '../constant';

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
    _500px.init({
      sdk_key: _500pxConfig.SDK_KEY
    });
    /*_500px.on('authorization_obtained', function () {
      console.log("500px authorization_obtained", arguments)
    });*/
    _500px.getAuthorizationStatus( (status) => {
     if(status === "authorized")
      this.refreshToken();
    });
  }
  render(){
    const {userDetails} = this.props;
    return (
      <div className="App">
        <Header  
          userDetails={userDetails}
          onLogoutClick={(e) => {
            e.preventDefault();
            this.props.dispatch(action.logout())}
          }
          onLoginClick={(e) => {
            e.preventDefault();
            _500px.ensureAuthorization(this.refreshToken);
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