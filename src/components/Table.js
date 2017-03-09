import React from 'react';
import {Link} from 'react-router';

const rowStyle = {
  border: 'solid 1px lightgrey',
  width: '100px',
  height: '100px'
};
const tableHeadingStyle = {
  padding: "10px"
}

class Table extends React.Component{
  renderRow(row){
    return <div key={row.id}><Link to={"/photo/" + row.id}><img style={rowStyle} src={row.image_url} title={row.name} alt={row.name}/></Link></div>;
  }
  render(){
    const {heading, content} = this.props;
    return ( 
      <div>
        <strong><div style={tableHeadingStyle}>{heading}</div></strong>
        <div>
          {content.map(this.renderRow)}
        </div>
      </div>
      );
  }
}

export default Table;

//Sift
//Saphire