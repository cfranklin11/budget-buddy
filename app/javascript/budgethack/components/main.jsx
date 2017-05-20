import React, { PropTypes, PureComponent } from 'react';
import NavMenu from './nav-menu';
import Footer from './footer';
import Departments from './departments';
import Programs from './programs';

export default class Main extends PureComponent {
  static propTypes = {
    departments: PropTypes.shape({
      currentDepartment: PropTypes.string,
      department: PropTypes.object,
      list: PropTypes.arrayOf(PropTypes.string),
      addedPrograms: PropTypes.arrayOf(PropTypes.object),
    }),
    fetchDataIfNeeded: PropTypes.func,
    addProgram: PropTypes.func,
  }

  static defaultProps = {
    departments: {},
    fetchDataIfNeeded: () => { return 'Unable to check data'; },
    addProgram: () => { return 'Could not add the program'; },
  }

  render () {
    const { departments,
      fetchDataIfNeeded,
      addProgram } = this.props;
    const { currentDepartment } = departments || {};

    return (
      <div>
        <div className="page-wrap">
          <NavMenu />
          {!currentDepartment && (
            <Departments
              departments={ departments }
              fetchDataIfNeeded={ fetchDataIfNeeded } />
          )}
          {currentDepartment && (
            <Programs
              departments={ departments }
              addProgram={ addProgram } />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
