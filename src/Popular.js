import React, { Component } from 'react';
import {connect}            from 'react-redux';

import Table                from './components/Table';

class Popular extends Component {
  render() {
    let title = 'Popular';

    const {popularItems, photos} = this.props;    
    const photosArr = popularItems.map((photoId) => photos[photoId])
    return (
      <div>
        {photos && <Table heading={title} content={photosArr}/>}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {popularItems: state.popularItems, photos: state.photos};
}
export default connect(mapStateToProps)(Popular);
