import React                from 'react';
import Header               from './Header';
import action               from '../action';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

import {connect}            from 'react-redux';
import axios  from 'axios';

import {_500pxConfig as _500pxConfig}   from '../constant';

/* global _500px */

function goto500pxLogin(){
  window.location.href = "/connect/500px";
}

class Application extends React.Component{
  refreshToken(){
    return;
    const self = this;
    _500px.api('/users', (response) => {
      const user = response.data.user;
      self.props.dispatch(action.gotToken(_500px.getToken()))
      self.props.dispatch(action.login({id:user.id, name: user.username}));
    });
  }
  componentDidMount(){
    const self = this;
    axios.get('/user').then(response => {
      if(response.data.error){
        alert('Please login to view your favorite items');
        return;
      }
      const {id, username} = response.data.user;
      self.props.dispatch(action.login({id, name: username}));
    });
  }
  render(){
    const self = this;
    const {userDetails} = this.props;
    return (
      <MuiThemeProvider>
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
              goto500pxLogin();
              {/*_500px.ensureAuthorization(self.refreshToken.bind(self));*/}
            }}
          />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
function mapStateToProps(state){
  return {userDetails: state.userDetails};
}
export default connect(mapStateToProps)(Application);