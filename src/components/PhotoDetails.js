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
    return (
      <div className="photoDetails">
        {Object.keys(image).length > 0?
          <div>
            <img title={image.name} alt={image.name} src={image.image_url} /> 
            {image.name}
          </div>: 
          'Image with id ' + this.props.params.photoId + ' not found'}</div>
      );
  }
}
export default PhotoDetails;