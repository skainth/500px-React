import actionType from '../constant';

function userDetails(state = {}, action){
  switch(action.type){
    case actionType.LOGGED_IN:
      return state;
    default:
      return state; 
  }
}
function popularItems(state = {title: "", content: []}, action){
  switch(action.type){
    case "GET_ITEMS":{
      console.log("Gettig items");
      return state;
    }
    case "GOT_ITEMS":{
      const newState = {title:"POPULAR", content: action.items};
      return newState;
    }
    default: {
      return state;
    }
  }
}

// The final state is as follows
// state = {userDetails:{}, popularItems: {title:"", content: []}, myLikes: {title: "", content: []}}

export default function(state = {userDetails: {}, popularItems: {}, myLikes: {}}, action){
  // Pass a part of the state to the respective reducer
  // and get only a part of the state from each one of them
  // ex. popularItems reducer will given only popularItems
  // and login will give login part of the state

  // Finally combine them into a single object
  // Important point here is that we are passing a part of
  // the state to the reducers. In turn they give back that
  // part of the state only.

  return  {   userDetails: userDetails(state.userDetails, action),
              popularItems: popularItems(state.popularItems, action) 
          }
}
