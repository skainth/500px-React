import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Table from './components/Table';

import action from './action';

import {connect} from 'react-redux';

class App extends Component {
  render() {
    const {popularItems, userDetails} = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Header 
          userDetails={userDetails} 
          onLogoutClick={() => this.props.dispatch(action.logout())}
          onLoginClick={() => this.props.dispatch(action.login({id: "3425", name: "Ski"}))}
        />
        {popularItems && <Table heading={popularItems.title} content={popularItems.content}/>}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {popularItems: state.popularItems, userDetails: state.userDetails};
}
export default connect(mapStateToProps)(App);
