import React          from 'react';
import ReactDOM       from 'react-dom';
import App            from './App';
import './index.css';

import {Provider}     from 'react-redux';
import {createStore, applyMiddleware}  from 'redux';

import thunk        from 'redux-thunk'; 
import reducer        from './reducer';
 
import action         from './action';

/*const initialState =  {
                        popularItems: {title: "Popular", content: [{id: 1, name: "SKI", description: "Sukhjinder"}, {id: 2, name: "AMR", description: "Amar"}]},
                        loggedIn: false,
                        myLikes: {title: "My Likes", content: []}
                      };*/

const initialState =  {
  popularItems: {title: "", content: []},
  loggedIn: false,
  myLikes: {title: "My Likes", content: []}
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

store.dispatch(action.getInitialState());

console.log("Current state", store.getState());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
