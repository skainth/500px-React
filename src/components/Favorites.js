import React      from 'react';
import {connect}  from 'react-redux';

import Table      from './Table';

class Favorites extends React.Component{
  render(){
    if(!this.props.userDetails){
      return <div>Please login</div>;
    }else{
      const {userDetails} = this.props;
      console.log("ud.favs", userDetails.favs)
      if(userDetails.favs){
        return <Table heading={"Your favorites"} content={userDetails.favs.photos}/>;
      }else{
        return (<div>You have no favorites</div>);
      }
    }
  }
}
function mapStateToProps(state){
  return {userDetails: state.userDetails};
}
export default connect(mapStateToProps)(Favorites);