import React          from 'react';
import ReactDOM       from 'react-dom';

import {Provider}     from 'react-redux';
import {createStore, applyMiddleware}  from 'redux';
import thunk          from 'redux-thunk'; 

import {Route, Router, browserHistory, IndexRoute} from 'react-router';

import './index.css';

import reducer        from './reducer'; 
import action         from './action';

import Application    from './components/Application';
import Callback       from './components/Callback';
import Favorites      from './components/Favorites';
import Home           from './components/Home';
import Popular        from './Popular';
import PhotoDetails   from './components/PhotoDetails';

const initialState =  {
  photos: {},
  popularItems: [],
  myLikes: {title: "My Likes", content: []}
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

store.dispatch(action.getInitialState());

const NotFound = () => {
  return <div>404!</div>;
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Application}>
        <IndexRoute component={Home}/>
        <Route path="/popular" component={Popular} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/photo/:photoId" component={PhotoDetails}/>
        
      </Route>
      <Route path="callback" component={Callback} />
    </Router>
  </Provider>,
  document.getElementById('root')
);