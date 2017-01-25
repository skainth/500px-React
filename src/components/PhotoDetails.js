import React from 'react';

import api from '../data';

class PhotoDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {image: {}};
  }
  componentDidMount(){
    const {photoId} = this.props.params;
    api.getPhoto(photoId, (response) => {
      if(response && response.data.photo){
        this.setState({image: response.data.photo});
      }
    })
  }
  render(){
    const {image} = this.state;
    return <div>{Object.keys(image).length > 0?<img title={image.name} alt={image.name} src={image.image_url} /> : 'Image with id ' + this.props.params.photoId + ' not found'}</div>
  }
}
export default PhotoDetails;