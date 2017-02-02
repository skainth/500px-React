import axios from 'axios';
import {_500px} from '../constant';

const api = {
  getPhoto: function(photoId, callback){
    axios.get(_500px.url + "/" + photoId,{
      params: {
        consumer_key: _500px.CONSUMER_KEY,
        image_size: 6,
        rpp: 5,
        exclude: "nude"
      }
    }).then(function(response){
      callback && callback(response);
    }).catch(()=>{
      callback && callback(false);
    })
  },
  getEditorsChoice: function(callback){
    axios.get(_500px.url + "?feature=editors",{
      params: {
        consumer_key: _500px.CONSUMER_KEY,
        image_size: 6,
        rpp: 5,
        exclude: "nude"
      }
    }).then(function(response){
      callback && callback(response);
    });
  }
}

export default api;