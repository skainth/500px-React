import React from 'react';

const divStyle = {
  color: 'blue',
  width: '100px',
  height: '100px'
};

class Table extends React.Component{
  renderRow(row){
    return <div key={row.id}><img style={divStyle} src={row.image_url} title={row.name} alt={row.name}/></div>;
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