import axios from 'axios';
const URL = "https://api.500px.com/v1/photos";
const CONSUMER_KEY = "NwBVrh4ZH9vaIxpy2pOuVs1mVgR4t3OONitVqCF5";
// const SDK_KEY = "2e4b9c5250a65b560d53e24a900249082eb2d8b1";

const action = {
  getInitialStateOLD: function(){
    return {type: "GET_ITEMS"}
  },
  getInitialState: function(){
    return (dispatch) => {
        axios.get(URL,{
          params: {
            consumer_key: CONSUMER_KEY,
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
  }
};
export default action;