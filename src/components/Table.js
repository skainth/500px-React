import React from 'react';
import {Link} from 'react-router';

const divStyle = {
  color: 'blue',
  width: '100px',
  height: '100px'
};

class Table extends React.Component{
  renderRow(row){
    return <div key={row.id}><Link to={"/photo/" + row.id}><img style={divStyle} src={row.image_url} title={row.name} alt={row.name}/></Link></div>;
  }
  render(){
    const {heading, content} = this.props;
    return (
      <div>
        <div>{heading}</div>
        <div>{content && content.map(this.renderRow)}</div>
      </div>);
  }
}

export default Table;