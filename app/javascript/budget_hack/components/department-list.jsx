import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DepartmentList extends Component {
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

  showDepartment = (name) => {
    const { fetchDataIfNeeded } = this.props;
    return () => {
      fetchDataIfNeeded('department', name);
    };
  }

  render () {
    const { departments } = this.props;
    const { list } = departments;
    const departmentList = list ?
    list.map((dept, index) => { return { name: dept, id: index }; }) : [];

    return (
      <div className="content-wrapper">
        <h1 className="list__title">
          Departments
        </h1>
        { departmentList.length > 0 && (
          <div className="list-wrapper">
            <ul className="list">
              { departmentList.map((department) => {
                return (
                  <li className="list__item" key={ department.id }>
                    <i aria-hidden="true" className="material-icons">
                      keyboard_arrow_right
                    </i>
                    <button
                      aria-label={ department.name }
                      onClick={ this.showDepartment(department.name) }>
                      { department.name }
                    </button>
                  </li>
                );
              }) }
            </ul>
          </div>
        ) }
      </div>
    );
  }
}
