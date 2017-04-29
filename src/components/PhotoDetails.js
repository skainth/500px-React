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
    this.state = {imageFound: null};
    this.lovePhoto = this.lovePhoto.bind(this);
  }
  componentDidMount(){
    this.loadPhoto();
  }
  loadPhoto(){
    let {photoId} = this.props.params;
    photoId = Number(photoId);        // Convert it to number
    const {photos} = this.props;

    if(photos[photoId]){
      this.setState({image: photos[photoId]});
    }else{
      api.getPhotoDetails(photoId, (response) => {
        if(response && response.data.photo){
          this.setState({image: response.data.photo});
        }
      });
    }
  }
  lovePhoto(){
    const {image, isLoved} =  this.state;
    const {userDetails} = this.props;
    this.props.dispatch(action.lovePhoto(image.id, isLoved,userDetails.id, userDetails.galleries[0].id, userDetails.token));
  }
  render(){
    const imageFound = this.state.image;
    const {image} = this.state;

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
                <LoveContainer imageId={image.id} />
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