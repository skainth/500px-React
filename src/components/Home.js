import React from 'react';

class Home extends React.Component{
  render(){
    return (
        <div style={{"textAlign": "left"}}>
          <div>This is a demo React app I built to learn React/Redux making use of 500px API</div>
          <div>Here you can checkout what is popular on 500px.com</div>
          <div>If you have an account on 500px already, then you can use that
          to view your favorites photos as well. Additionally you will be able to 
          love/unlove photos from this app.
          </div>
          <div>If you do not have a 500px account already, you can use skainth.dummy@gmail.com with password account1 to login
          </div>
        </div>
      );
  }
}

export default Home;