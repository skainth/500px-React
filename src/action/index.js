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
  getFavs: function(userId, gallery, dispatch){
      api.getGalleryPhotos(userId, gallery.id, (response) => {
        dispatch({type: actionType.GOT_FAVS, data: response.data});
      });
    
  },
  gotInitialState: function(items){
    return {type: actionType.GOT_ITEMS, items}
  },
  login: function(data){
    const self = this;
    return (dispatch) => {
        api.getGalleries(data.id, (response) => {
        if(response)
          data.galleries = response.data.galleries;
        dispatch({type: actionType.LOGGED_IN, data});
        if(data.galleries.length > 0){
          self.getFavs(data.id, data.galleries[0], dispatch);
        }
      });
    }
  },
  logout: function(){
    return {type: actionType.LOGGED_OUT};
  }
};
export default action;