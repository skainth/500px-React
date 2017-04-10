import React      from 'react';
import {connect}  from 'react-redux';

import Table      from './Table';

function idsToArray(arrIds, searchObj, targetArr){
  arrIds.forEach((id) => targetArr.push(searchObj[id]));
}
class Favorites extends React.Component{
  render(){
    if(!this.props.userDetails){
      return <div>Please login</div>;
    }else{
      const {userDetails, photos} = this.props;
      if(userDetails.favs && userDetails.favs.length){
        const favs = [];
        idsToArray(userDetails.favs, photos, favs);
        console.log("favs", favs);
        return <Table heading={"Your favorites"} content={favs}/>;
      }else{
        return (<div>You have no favorites</div>);
      }
    }
  }
}
function mapStateToProps(state){
  return {userDetails: state.userDetails, photos: state.photos};
}
export default connect(mapStateToProps)(Favorites);
