import React from 'react';

import api from '../data';

class PhotoDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {image: {}};
  }
  componentDidMount(){
    const {photoId} = this.props.params;
    api.getPhotoDetails(photoId, (response) => {
      if(response && response.data.photo){
        this.setState({image: response.data.photo});
      }
    })
  }
  render(){
    const {image} = this.state;
    const imageFound = Object.keys(image).length > 0;
    const authorName = imageFound? image.user.firstname + image.user.lastname : '';
    const imageTitle = imageFound? image.name + ' by ' + authorName : ''; 
    return (
      <div className="photoDetails">
        {imageFound?
          <div>
            <img title={imageTitle} alt={image.name} src={image.image_url} /> 
            {imageTitle}
          </div>
          :'Image with id ' + this.props.params.photoId + ' not found'}</div>
      );
  }
}
export default PhotoDetails;