import React from 'react';
import Header from './Header';
import action from '../action';

import {connect} from 'react-redux';

class Application extends React.Component{
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
            this.props.dispatch(action.login({id: "3425", name: "Ski"}))}}
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