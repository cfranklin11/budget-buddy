import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DepartmentList from './department-list';
import DepartmentWidget from './department-widget';

export default class Main extends PureComponent {
  static propTypes = {
    departments: PropTypes.shape({
      currentDepartment: PropTypes.string,
      department: PropTypes.object,
      list: PropTypes.arrayOf(PropTypes.string),
      addedPrograms: PropTypes.arrayOf(PropTypes.object),
    }),
    fetchData: PropTypes.func,
    addProgram: PropTypes.func,
    removeProgram: PropTypes.func,
  }

  static defaultProps = {
    departments: {},
    fetchData: () => { return 'Unable to check data'; },
    addProgram: () => { return 'Could not add the program'; },
    removeProgram: () => { return 'Could not add the program'; },
  }

  render () {
    const {
      departments,
      fetchData,
      addProgram,
      removeProgram,
    } = this.props;

    const { currentDepartment } = departments || {};

    return (
      <div>
        <div className="page-wrap">
          {!currentDepartment && (
            <DepartmentList
              departments={ departments }
              fetchData={ fetchData } />
          )}
          {currentDepartment && (
            <DepartmentWidget
              removeProgram={ removeProgram }
              departments={ departments }
              addProgram={ addProgram } />
          )}
        </div>
      </div>
    );
  }
}
