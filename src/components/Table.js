import React            from 'react';
import {Link}           from 'react-router';
import Subheader        from 'material-ui/Subheader';
import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "100%",
    height: "550",
    overflowY: 'auto',
  },
  imageStyle:{
    width:"100%",
    height:"100%"
  }
};

class Table extends React.Component{
  renderRow(row, index){
    const isThird = !(index % 3);
    return (
      <GridTile key={row.id}
        cols={isThird? 2 : 1}
        rows={isThird? 2 : 1}
        title={row.name}
        titlePosition="bottom"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      >
        <Link to={"/photo/" + row.id}>
          <img src={row.image_url} title={row.name} alt={row.name} style={styles.imageStyle}/>
        </Link>
      </GridTile>
    );
  }
  render(){
    const {heading, content} = this.props;
    return ( 
      <div style={styles.root}>
        <GridList
          cols={2}
          padding={1}
          style={styles.gridList}
          cellHeight={350}
        >
        <Subheader>{heading}</Subheader>
          {content.map(this.renderRow)}
        </GridList>
      </div>
    );
  }
}

export default Table;

//Sift
//Saphire