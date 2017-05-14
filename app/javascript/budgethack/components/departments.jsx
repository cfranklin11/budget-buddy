import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import List from './list';


export default class Departments extends Component {
  propTypes = {
    departments: PropTypes.arrayOf(React.PropTypes.string),
  }

  render () {
    return (
      <div>
        <h1>
          <Link to="/">Departments</Link>
        </h1>
        <div className="photo-grid">
          <List items={this.props.departments} />
        </div>
      </div>
    );
  }
}
