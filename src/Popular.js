import React, { Component } from 'react';
import {connect} from 'react-redux';

import Table from './components/Table';

class Popular extends Component {
  render() {
    const {popularItems} = this.props;
    return (
      <div>
        {popularItems && <Table heading={popularItems.title} content={popularItems.content}/>}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {popularItems: state.popularItems};
}
export default connect(mapStateToProps)(Popular);
