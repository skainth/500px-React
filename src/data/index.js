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
    axios.get(_500px.url + "?feature=user_favorites",{
      params: {
        consumer_key: _500px.CONSUMER_KEY,
        image_size: 6,
        rpp: 5,
        exclude: "nude"
      }
    }).then(function(response){
      callback && callback(response);
    });
  },
  getData: function(options, callback){
    axios.get(_500px.baseURL + "/" + options.api,{
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
  getGalleries: function(userid, callback){
    const options = {api: `users/${userid}/galleries`};
    this.getData(options, callback);
  },
  getGalleryPhotos: function(userid, galleryid, callback){
    //GET users/:user_id/galleries/:id/items
    this.getData({api: `users/${userid}/galleries/${galleryid}/items`}, callback);
  }
}

export default api;