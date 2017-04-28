import React          from 'react';
import {connect}      from 'react-redux';
import api            from '../data';
import action         from '../action';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import LoveContainer  from  './LoveContainer';

import {_500pxConfig} from '../constant';

class PhotoDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.lovePhoto = this.lovePhoto.bind(this);
  }
  componentDidMount(){
    this.isStateUpdateRequired(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.isStateUpdateRequired(nextProps)
  }
  isStateUpdateRequired(props){
    const photoId = Number(this.props.params.photoId);
    let isLoved = false;
    const {photos} = props;
    const imageFound = photos[photoId];
    const {userDetails} = props;
    if(imageFound){
      if(userDetails && userDetails.favs && userDetails.favs.indexOf(photoId) != -1){
        isLoved = true;
      }
      this.setState({image: imageFound, isLoved: isLoved});
    }
  }
  loadPhoto(){
    let {photoId} = this.props.params;
    photoId = Number(photoId);        // Convert it to number
    const {userDetails, photos} = this.props;
    const self = this;

    if(photos[photoId]){
      let isLoved = false;
      if(userDetails.favs && userDetails.favs.indexOf(photoId) > -1){
        isLoved = true;
      }
      this.setState({image: photos[photoId], isLoved});
    }else{
      console.log("TODO: Fetch photo in case it is not part of favs or popular");
      return;
      /*api.getPhotoDetails(photoId, (response) => {
        if(response && response.data.photo){
          let isLoved = false;
          if(this.props.userDetails && this.props.userDetails.favs){
            isLoved = this.props.userDetails.favs.photos.find((elem) => 
                                                  {
                    return elem.id == response.data.photo.id
                                              });
          }

          this.setState({image: response.data.photo, isLoved});
        }
      }); */
    }
  }
  lovePhoto(){
    const {image, isLoved} =  this.state;
    const {userDetails} = this.props;
    this.props.dispatch(action.lovePhoto(image.id, isLoved,userDetails.id, userDetails.galleries[0].id, userDetails.token));
  }
  render(){
    const photoId = Number(this.props.params.photoId);
    const imageFound = this.state.image;
    const {isLoved,image} = this.state;
    const {userDetails} = this.props;
    const authorName = imageFound? imageFound.user.firstname + ' ' + imageFound.user.lastname : '';
    const imageTitle = imageFound? imageFound.name + ' by ' + authorName : '';
    return (
      <div className="photoDetails">
        {imageFound?
          <div>
            <Card>
              <CardHeader 
                title={authorName}
                avatar={image.user.userpic_url}
              />
              <CardMedia
                overlay={<CardTitle title={imageTitle} />}
              >
                <img src={image.image_url} />
              </CardMedia>
              <CardActions>
                <LoveContainer isLoved={isLoved} imageId={image.id} userId={userDetails.id} galleryId={userDetails.galleries[0].id} />
              </CardActions>
              <CardText>
                <div dangerouslySetInnerHTML={createMarkup(imageFound)} />
              </CardText>
            </Card>
          </div>
          :'Image with id ' + this.props.params.photoId + ' not found'}</div>
      );
  }
}
function mapStateToProps(state, ownProps){
  return {userDetails: state.userDetails, photos: state.photos};
}
function createMarkup(image) {
  return {__html: image.description};
}
export default connect(mapStateToProps)(PhotoDetails);