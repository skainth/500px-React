import axios from 'axios';
import {_500px} from '../constant';

const api = {
  getData: function(options, callback){
    axios.get(_500px.baseURL + "/" + options.api,{
      params: {
        consumer_key: _500px.CONSUMER_KEY,
        image_size: options.image_size || 6,
        rpp: 5,
        exclude: "nude"
      }
    }).then(function(response){
      callback && callback(response);
    }).catch(()=>{
      callback && callback(false);
    })
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
  }
}

export default api;