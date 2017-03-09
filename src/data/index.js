import axios    from 'axios';
import request  from 'request';
import Purest   from 'purest';
const purest = Purest({request});
import config   from '@purest/providers';

import {_500pxConfig as _500pxConfig} from '../constant';

const api = {
  getData: function(options, callback){
    const params = {
      consumer_key: _500pxConfig.CONSUMER_KEY,
      image_size: options.image_size || 6,
      exclude: "nude"
    }
    if(options.numPhotos)
        options.numPhotos;
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
    const options = {api: 'photos'}
    this.getData(options, callback);
  },
  getGalleries: function(userid, callback){
    const options = {api: `users/${userid}/galleries`};
    this.getData(options, callback);
  },
  getGalleryPhotos: function(userid, galleryid, callback){
    //GET users/:user_id/galleries/:id/items
    this.getData({api: `users/${userid}/galleries/${galleryid}/items`}, callback);
  },
  lovePhoto: function(id, loved, callback, userId, galleryId){
    // https://github.com/500px/api-documentation/blob/master/endpoints/galleries/PUT_galleries_id_items.md
    // v1/users/23/galleries/4/items
    const fpx = purest({provider: '500px', key: _500pxConfig.CONSUMER_KEY, secret: _500pxConfig.CONSUMER_SECRET, config});
   
    let dataObj = {}; 
    dataObj[loved? 'remove': 'add'] = {photos: [id]};
    
    fpx.put('users/' + userId + "/galleries/" + galleryId + "/items")
    .auth(_500pxConfig.TOKEN, _500pxConfig.TOKEN_SECRET)
    .body(dataObj)
    .request((err, res, body) => {
      let resp = {data: body};
      if(loved)
        resp.unloved = true;
      else
        resp.loved = true;
      callback && callback(resp)
    });
  }
}

export default api;