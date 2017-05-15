import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import List from './list';

export default class Departments extends Component {

  componentDidMount () {
    this.props.fetchDataIfNeeded('departments');
  }

  render () {
    const { departments, fetchDataIfNeeded } = this.props;
    const { list } = departments;
    const deptProp = list ? list.map((dept) => { return { name: dept }; }) : [];

     return (
      <div>
        <h1 className="list__title">
          Departments
        </h1>
        <div className="photo-grid">
          { deptProp.length > 0 && (
            <List items={deptProp} fetchDataIfNeeded={fetchDataIfNeeded} />
          ) }
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
  departments: {},
};
