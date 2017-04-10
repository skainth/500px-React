import React from 'react';


class Callback extends React.Component{
  componentDidMount(){
    var hash_string = window.location.hash.substring(1),
          parts = hash_string.split(','),
          part,
          result = {},
          parent_document = window.opener ? window.opener : parent;
      while (part = parts.shift()) {
        part = part.split(':');
        result[part[0]] = part[1] == undefined ? true : part[1];
      }
      parent_document[result.callback](result);
      if (window.opener) {
        window.close();
      }
  }
  render(){
    return <div>Hello There!!!</div>;
  }
}

export default Callback;