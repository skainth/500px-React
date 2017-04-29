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
    this.state = {isLoved: false};
    this.lovePhoto = this.lovePhoto.bind(this);
  }
  lovePhoto(){
    const {imageId, userDetails} =  this.props;
    const {isLoved} = this.state;
    if(!userDetails){
      alert('Please login to love items');
    }
    const galleryId = userDetails.galleries[0].id;
    this.props.dispatch(action.lovePhoto(imageId, isLoved, userDetails.id, galleryId));
  }
  componentWillReceiveProps(nextProps){
    // debugger;
    console.log("componentWillReceiveProps", nextProps, this.props);
    this.isStateUpdateRequired(nextProps)
  }
  /*shouldComponentUpdate(){
    debugger;
  }
  componentWillUpdate(){
    debugger;
  }*/
  isStateUpdateRequired(props){
    const photoId = Number(this.props.imageId);
    let isLoved = false;
    const {photos} = this.props;
    if(!photos)
      return;
    const imageFound = photos[photoId];
    const {userDetails} = props;
    if(imageFound){
      if(userDetails && userDetails.favs && userDetails.favs.indexOf(photoId) != -1){
        isLoved = true;
      }
      this.setState({isLoved});
    }
  }
  isImageLoved(photoId){
    let isLoved = false;

    const {photos} = this.props;
    if(!photos)
      return false;
    const imageFound = photos[photoId];
    const {userDetails} = this.props;
    if(imageFound){
      if(userDetails && userDetails.favs && userDetails.favs.indexOf(photoId) != -1){
        isLoved = true;
      }
    }
    return isLoved;
  }
  render(){
    let isLoved = this.isImageLoved(this.props.imageId);

    return (
      <IconButton tooltip={isLoved? 'remove from favorites': 'add to favorites'} tooltipPosition={'top-left'}>{
        isLoved
          ? <Favorite onClick={this.lovePhoto} color={red500} /> 
          : <Favorite_Border onClick={this.lovePhoto} color={grey400} />
        }
      </IconButton>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {userDetails: state.userDetails, photos: state.photos};
}
export default connect(mapStateToProps)(LoveContainer);