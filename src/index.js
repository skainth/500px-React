import React          from 'react';
import ReactDOM       from 'react-dom';
import App            from './App';
import PhotoDetails   from './components/PhotoDetails';
import './index.css';

import {Provider}     from 'react-redux';
import {createStore, applyMiddleware}  from 'redux';

import thunk          from 'redux-thunk'; 
import reducer        from './reducer';
 
import action         from './action';

/*
var request = require('request');
var OAuth   = require('oauth-1.0a');
var crypto  = require('crypto');


var oauth = OAuth({
    consumer: {
        key: 'NwBVrh4ZH9vaIxpy2pOuVs1mVgR4t3OONitVqCF5',
        secret: 'Js0R6ZpNUOamv9DCrlvwm3oMNPhk65PKN0sVfTwb'
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

var request_data = {
    url: 'https://api.500px.com/v1/oauth/authorize',
    method: 'POST',
    data: {
        status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
    }
};

var token = {
    key: '370773112-NwBVrh4ZH9vaIxpy2pOuVs1mVgR4t3OONitVqCF5',
    secret: 'Js0R6ZpNUOamv9DCrlvwm3oMNPhk65PKN0sVfTwb'
};

request({
    url: request_data.url,
    method: request_data.method,
    form: oauth.authorize(request_data, token)
}, function(error, response, body) {
  console.log("RE Q", arguments)
    //process your data here
});
*/

import {Route, Router, hashHistory} from 'react-router';


const initialState =  {
  popularItems: {title: "", content: []},
  userDetails: {id: "3425", name: "Ski"},
  myLikes: {title: "My Likes", content: []}
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

store.dispatch(action.getInitialState());

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}></Route>
      <Route path="/photo/:photoId" component={PhotoDetails}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
