import {actionType} from '../constant';
import api from '../data';

const action = {
  getInitialState: function(){
    return (dispatch) => {
        api.getEditorsChoice((response) => {
          dispatch({type: actionType.GOT_ITEMS, items: response.data.photos});
        });
      }
  },
  gotInitialState: function(items){
    return {type: actionType.GOT_ITEMS, items}
  },
  login: function(data){
    return {type: actionType.LOGGED_IN, data};
  },
  logout: function(){
    return {type: actionType.LOGGED_OUT};
  }
};
export default action;