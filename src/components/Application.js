import React from 'react';
import Header from './Header';
import action from '../action';

import {connect} from 'react-redux';

import {_500px as _500pxConfig}   from '../constant';

/* global _500px */

class Application extends React.Component{
  componentDidMount(){    
    _500px.init({
      sdk_key: _500pxConfig.SDK_KEY
    });
    _500px.on('authorization_obtained', function () {
      // alert('You have logged in');
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
            const self = this;
            e.preventDefault();
            // this.props.dispatch(action.login({id: "3425", name: "Ski"}))
            _500px.ensureAuthorization(function () {
              _500px.api('/users', function (response) {
                  const user = response.data.user;
                  self.props.dispatch(action.login({id:user.id, name: user.username}))
              });
            });
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