import React from 'react';
import { Link } from 'react-router';
import List from './list';


const Departments = React.createClass({
  render(){
    return(
      <div>
        <h1>
          <Link to="/">Departments</Link>
        </h1>
        <div className="photo-grid">
          <List  items = { this.props.departments} />
        </div>
      </div>
    )
  }
});

export default Departments;
