import axios from 'axios';

import {_500pxConfig as _500pxConfig} from '../constant';

const api = {
  getData: function(options, callback, parameters){
    const params = Object.assign({
      consumer_key: _500pxConfig.CONSUMER_KEY,
      image_size: options.image_size || 6
    }, parameters);

    if(options.method == 'post'){
      axios.post(_500pxConfig.baseURL + "/" + options.api,{
        params: params
        }).then(function(response){
        callback && callback(response);
      }).catch(()=>{
        callback && callback(false);
      })    
    }else{
      axios.get(_500pxConfig.baseURL + "/" + options.api,{
      params: params
      }).then(function(response){
      callback && callback(response);
    }).catch(()=>{
      callback && callback(false);
    })
    }
  },
  getPhotoDetails(photoId, callback){
    this.getData({api: 'photos/' + photoId}, callback);
  },
  getPopular: function(callback){
    const options = {api: 'photos'};
    const params = {'only': 'landscapes,sport,food'};
    this.getData(options, callback, params);
  },
  getGalleries: function(userid, callback){
    const options = {api: `users/${userid}/galleries`};
    this.getData(options, callback);
  },
  getGalleryPhotos: function(userid, galleryid, callback){
    //GET users/:user_id/galleries/:id/items
    this.getData({api: `users/${userid}/galleries/${galleryid}/items`}, callback);
  },
  lovePhoto: function(photoId, loved, callback, userId, galleryId, token) {
    const url = '/love';
    const body = {photoId, galleryId, userId, loved};

    axios.post(url, {
      params: body
    }).then(resp => {
      callback && callback(resp.data);
    }).catch(error => console.log(error));
  }
};

export default api;