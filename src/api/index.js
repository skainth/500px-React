/**
 * Created by z001hmj on 4/3/17.
 */

const request = require('request');
const Purest  = require('purest');
const config  = require('@purest/providers');
const purest = Purest({request});

const _500pxConfig = require('../../config/500px.config.js');

module.exports = {
  getUserDetails: function(session, callback) {
    if (callback) {
      if (!session.access_token) {
        // session not found
        callback({error: true, message: "unauthorized"});
        return;
      }
      const fpx = purest({
        provider: '500px',
        key: _500pxConfig.CONSUMER_KEY,
        secret: _500pxConfig.CONSUMER_SECRET,
        config
      });
      fpx.get('/users')
        .auth(session.access_token, session.access_secret)
        .request((err, res, body) => {
          callback(err, body);
        })
    }
  },
  lovePhoto: function({loved, userId, photoId, galleryId}, {access_token, access_secret}, callback){
    // https://github.com/500px/api-documentation/blob/master/endpoints/galleries/PUT_galleries_id_items.md
    // v1/users/23/galleries/4/items
    const fpx = purest({provider: '500px', key: _500pxConfig.CONSUMER_KEY, secret: _500pxConfig.CONSUMER_SECRET, config});

    let dataObj = {};
    dataObj[loved? 'remove': 'add'] = {photos: [photoId]};

    fpx.put('users/' + userId + "/galleries/" + galleryId + "/items")
      .auth(access_token, access_secret)
      .body(dataObj)
      .request((err, res, body) => {
        if(callback) {
          if (!err) {
            let resp = {data: body};
            if (loved)
              resp.unloved = true;
            else
              resp.loved = true;
            callback(resp);
          } else {
            callback({error: true, message: res.statusMessage});
          }
        }
      });
  }
};