import React      from 'react';
import {connect}  from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Favorite   from 'material-ui/svg-icons/action/favorite';
import Favorite_Border from 'material-ui/svg-icons/action/favorite-border';
import {red500, grey400} from 'material-ui/styles/colors';

import action     from '../action';

class LoveContainer extends React.Component{
  constructor(props){
    super(props);
    this.lovePhoto = this.lovePhoto.bind(this);
  }
  lovePhoto(){
    const {imageId, isLoved, userDetails} =  this.props;
    if(!userDetails){
      alert('Please login to love items');
    }
    const galleryId = userDetails.galleries[0].id;
    this.props.dispatch(action.lovePhoto(imageId, isLoved, userDetails.id, galleryId));
  }
  render(){
    const {isLoved} = this.props;
    return (
      <IconButton tooltip={isLoved? 'remove from favorites': 'add to favorites'} >{
        isLoved
          ? <Favorite onClick={this.lovePhoto} color={red500} /> 
          : <Favorite_Border onClick={this.lovePhoto} color={grey400} />
        }
      </IconButton>
    );
  }
}

function mapStateToProps(state){
  return {userDetails: state.userDetails};
}
export default connect(mapStateToProps)(LoveContainer);