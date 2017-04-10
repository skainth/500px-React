import {actionType}   from '../constant';

import _              from 'underscore';

function userDetails(state = false, action){
  switch(action.type){
    case actionType.LOGGED_IN:
      return Object.assign({}, state, action.data);
    case actionType.LOGGED_OUT:
      return false;  
    case actionType.GOT_FAVS:{
      const favPhotoIds = _.pluck(action.data.photos, 'id');
      return Object.assign({}, state, {favs: favPhotoIds})
    }
    case actionType.LOVE_PHOTO:{
      const newState = Object.assign({}, state);
      newState.favs = newState.favs.concat(Object.keys(action.data).map((key) => Number(key)));
      newState.LOVED = true;
      return newState;
    }
    case actionType.UNLOVE_PHOTO:{
      let newState = Object.assign({}, state);
      // Convert to array of keys
      const unlovedItems = Object.keys(action.data).map((key) => Number(key)); 
      newState.favs = newState.favs.filter((photoId) => unlovedItems.indexOf(photoId) == -1);
      newState.UNLOVED = true;
      return newState;
    }
    case actionType.GOT_TOKEN: {
      return Object.assign({}, state, {token: action.data});
    }
    default:
      return state; 
  }
}

function popularItems(state = {title: "", content: []}, action){
  switch(action.type){
    case actionType.GET_ITEMS:{
      return state;
    }
    case actionType.GOT_ITEMS:{
      const newState = [];
      action.items.forEach((photo) => newState.push(photo.id));
      return newState;
    }
    default: {
      return state;
    }
  }
}

function photosReducer(state = {}, action){
  switch(action.type){
    case actionType.GOT_ITEMS:{
      const photos = {};
      action.items.forEach((photo) => photos[photo.id] = photo);
      return Object.assign({}, state, photos);
    }
    case actionType.GOT_FAVS:{
      const photos = {};
      action.data.photos.forEach((photo) => photos[photo.id] = photo);
      return Object.assign({}, state, photos);
    }
    default:
      return state;
  }
}
//https://grant.outofindex.com/connect/500px/callback

// The final state is as follows
// state = {userDetails:{}, popularItems: {title:"", content: []}, myLikes: {title: "", content: []}}

export default function(state = {userDetails: {}, popularItems: [], myLikes: {}}, action){
  // Pass a part of the state to the respective reducer
  // and get only a part of the state from each one of them
  // ex. popularItems reducer will given only popularItems
  // and login will give login part of the state

  // Finally combine them into a single object
  // Important point here is that we are passing a part of
  // the state to the reducers. In turn they give back that
  // part of the state only.

  return  {   userDetails: userDetails(state.userDetails, action),
              popularItems: popularItems(state.popularItems, action),
              photos: photosReducer(state.photos, action) 
          }
}
