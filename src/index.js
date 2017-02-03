import React          from 'react';
import ReactDOM       from 'react-dom';

import {Provider}     from 'react-redux';
import {createStore, applyMiddleware}  from 'redux';
import thunk          from 'redux-thunk'; 

import reducer        from './reducer'; 
import action         from './action';

import {Route, Router, browserHistory, IndexRoute} from 'react-router';

import './index.css';

import Home           from './components/Home';
import Popular        from './Popular';
import PhotoDetails   from './components/PhotoDetails';

const initialState =  {
  popularItems: {title: "", content: []},
  myLikes: {title: "My Likes", content: []}
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

store.dispatch(action.getInitialState());

import Application from './components/Application';
import Callback from './components/Callback';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Application}>
        <IndexRoute component={Home}/>
        <Route path="/popular" component={Popular} />
        <Route path="/photo/:photoId" component={PhotoDetails}/>
      </Route>
      <Route path="callback.html" component={Callback} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
