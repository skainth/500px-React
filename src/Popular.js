import React, { Component } from 'react';
import {connect} from 'react-redux';

import Table from './components/Table';

class Popular extends Component {
  render() {
    let photos = null, title = 'Popular';

    const {popularItems} = this.props;
    photos = popularItems.content;

    return (
      <div>
        {photos && <Table heading={title} content={photos}/>}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {popularItems: state.popularItems};
}
export default connect(mapStateToProps)(Popular);
