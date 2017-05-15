import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import List from './list';

export default class Departments extends Component {

  componentDidMount () {
    this.props.fetchDataIfNeeded('departments');
  }

  render () {

    const { departments, fetchDataIfNeeded } = this.props;
    return (
      <div>
        <h1 className="list__title">
          Departments
        </h1>
        <div className="photo-grid">
          <List items={departments.list} fetchDataIfNeeded={fetchDataIfNeeded} />
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
