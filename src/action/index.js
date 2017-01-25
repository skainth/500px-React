import axios from 'axios';
import {actionType, _500px} from '../constant';

const action = {
  getInitialState: function(){
    return (dispatch) => {
        axios.get(_500px.url,{
          params: {
            consumer_key: _500px.CONSUMER_KEY,
            image_size: 6,
            rpp: 5,
            exclude: "nude"
          }
        }).then(function(response){
          dispatch({type: "GOT_ITEMS", items: response.data.photos});
        });
      }
  },
  gotInitialState: function(items){
    return {type: "GOT_ITEMS", items}
  },
  login: function(data){
    return {type: actionType.LOGGED_IN, data};
  },
  logout: function(){
    return {type: actionType.LOGGED_OUT};
  },
  getPhoto: function(photoId){
    return (dispatch) => {
      axios.get(_500px.url + "/" + photoId,{
          params: {
            consumer_key: _500px.CONSUMER_KEY,
            image_size: 6,
            rpp: 5,
            exclude: "nude"
          }
        }).then((response) => {
          dispatch({type: "GOT_PHOTO", item: response});
        });
    }
  }
};
export default action;