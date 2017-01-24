export default function(state = {}, action){
  switch(action.type){
    case "GET_ITEMS":{
      console.log("Gettig items");
      return state;
    }
    case "GOT_ITEMS":{
      console.log(action);
      const newState = Object.assign({}, state, {popularItems: {title:"POPULAR", content: action.items}});
      console.log("OLD", state, "NEW", newState);
      return newState;
      // return state;
    }
    default: {
      return state;
    }
  }
}