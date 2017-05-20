import React, { Component, PropTypes } from 'react';
import List from './list';

export default class Departments extends Component {
  static propTypes = {
    departments: PropTypes.shape({
      currentDepartment: PropTypes.string,
      department: PropTypes.object,
      list: PropTypes.arrayOf(PropTypes.string),
      addedPrograms: PropTypes.arrayOf(PropTypes.object),
    }),
    fetchDataIfNeeded: PropTypes.func,
  };

  static defaultProps = {
    departments: {},
    fetchDataIfNeeded: () => { return 'Unable to check data'; },
  };

  componentDidMount () {
    this.props.fetchDataIfNeeded('departments');
  }

  render () {
    const { departments, fetchDataIfNeeded } = this.props;
    const { list } = departments;
    const deptProp = list ? list.map((dept) => { return { name: dept }; }) : [];

    return (
      <div>
        <h1 className="list__title" tabIndex="0">
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
