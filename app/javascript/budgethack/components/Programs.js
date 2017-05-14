import React from 'react';
import { Link } from 'react-router';
import List from './list';


const Programs = React.createClass({
  render(){
    return(
      <div>
        <h1>
          <Link to="/">Programs</Link>
        </h1>
        <div className="photo-grid">
          <List  items = { this.props.infographics}/>
        </div>
      </div>
    )
  }
});

export default Programs;
