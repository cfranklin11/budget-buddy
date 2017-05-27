import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  handleClick = (name) => {
    const { fetchDataIfNeeded } = this.props;
    return () => {
      fetchDataIfNeeded('department', name);
    };
  }

  render () {
    const { departments, fetchDataIfNeeded } = this.props;
    const { list } = departments;
    const deptProp = list ?
      list.map((dept, index) => { return { name: dept, id: index }; }) :
      [];

    return (
      <div>
        <h1 className="list__title" tabIndex="0">
          Departments
        </h1>
        <div className="photo-grid">
          { deptProp.length > 0 && (
            <div className="list-wrapper" >
              <ul className="list">
                { deptProp.map((item, i) => {
                  return (
                    <li className="list__item" key={ item.id }>
                      <i aria-hidden="true" className="material-icons">
                        keyboard_arrow_right
                      </i>
                      <button
                        aria-label={ item.name }
                        onClick={ this.handleClick(item.name) }>
                        { item.name }
                      </button>
                    </li>
                  );
                }) }
              </ul>
            </div>
          ) }
        </div>
      </div>
    );
  }
}
