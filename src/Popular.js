import React, { Component } from 'react';
import {connect} from 'react-redux';

import Table from './components/Table';

class Popular extends Component {
  render() {
    let photos = null, title = '';

    const {popularItems, userDetails, location} = this.props;
    photos = popularItems.content;

    if(location.pathname.indexOf('popular') === -1){
      if(this.props.userDetails){
        if(this.props.userDetails.galleries.length > 0){
          photos = userDetails.favs.photos;
          title = 'Your favs';
        }
      }
    }
    return (
      <div>
        {photos && <Table heading={title} content={photos}/>}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {popularItems: state.popularItems,
          userDetails: state.userDetails};
}
export default connect(mapStateToProps)(Popular);
