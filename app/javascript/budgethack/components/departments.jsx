import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import List from './list';


export default class Departments extends Component {
  componentDidMount () {
    this.props.fetchDataIfNeeded('departments');
  }

  render () {
    const { departments } = this.props;

    return (
      <div>
        <h1>
          <Link to="/">Departments</Link>
        </h1>
        <div className="photo-grid">
          <List items={departments.list} />
        </div>
      </div>
    );
  }
}

Departments.propTypes = {
  departments: PropTypes.object,
  fetchDataIfNeeded: PropTypes.func,
};

Departments.defaultProps = {
  departments: {
    list: [],
  },
};
