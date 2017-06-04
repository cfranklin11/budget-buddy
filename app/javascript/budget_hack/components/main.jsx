import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DepartmentList from './department-list';
import DepartmentWidget from './department-widget';
import ProgramWidget from './program-widget';
import ProgramList from './program-list';
import Button from './button';

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

  constructor () {
    super();
    this.state = {
      isProgListVisible: false,
    };
  }

  addProgram = (name) => {
    return () => {
      this.props.addProgram(name);
      this.setState({ isProgListVisible: false });
    };
  }

  showPrograms = () => {
    console.log("showPrograms");
    this.setState({ isProgListVisible: true });
  }

  render () {
    const { isProgListVisible } = this.state;

    const {
      departments,
      fetchData,
      addProgram,
      removeProgram,
    } = this.props;

    const { currentDepartment } = departments || {};

    return (
      <div className="page-wrap">
        {!currentDepartment &&
          <DepartmentList
            departments={ departments }
            fetchData={ fetchData } />
        }

        {currentDepartment && (
          <div>
            <DepartmentWidget
              removeProgram={ removeProgram }
              departments={ departments }
              addProgram={ addProgram } />

            <div className="menu-button-actions">
              <Button
                label="Add a Program"
                icon="add_circle_outline"
                onClick={ this.showPrograms } />

              <Button label="share" icon="share" />
            </div>

          </div>
          )}

        { departments.addedPrograms.length > 0 &&
          <ul className="program-widget-list">
            { departments.addedPrograms.map((program) => {
              return (
                <ProgramWidget
                  removeProgram={ removeProgram }
                  key={ program.id }
                  program={ program }
                  addDeliverable={ this.addDeliverable } />
              );
            })
            }
          </ul>
        }
        { isProgListVisible &&
          <div>
            <ProgramList
              programs={ departments.department.programs }
              addProgram={ this.addProgram } />
          </div>
        }
      </div>
    );
  }
}
