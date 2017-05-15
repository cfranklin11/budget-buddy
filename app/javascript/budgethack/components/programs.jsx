import React from 'react';
import { Link } from 'react-router';
import List from './list';

const Programs = React.createClass({
  render(){
    return(
      <div className="programs">
        <h1 className="programs__department-name">
          <img className="programs__icon" src="http://placehold.it/36x36" />
          Health and Human Services
        </h1>
        <h2 className="list__title">
          Select a Program:
        </h2>
        <div className="photo-grid">
          <List  items = { programs } isPrograms />
        </div>
      </div>
    )
  }
});

export default Programs;
