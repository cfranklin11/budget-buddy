import React, { Component, PropTypes } from 'react';
import { BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer } from 'recharts';
import List from './list';
import Program from './program';

export default class Programs extends Component {
  static propTypes = {
    departments: PropTypes.shape({
      currentDepartment: PropTypes.string,
      department: PropTypes.object,
      list: PropTypes.arrayOf(PropTypes.string),
      addedPrograms: PropTypes.arrayOf(PropTypes.object),
    }),
    addProgram: PropTypes.func,
  }

  static defaultProps = {
    departments: {},
    addProgram: () => { return 'Could not add the program'; },
  }

  constructor () {
    super();

    this.state = {
      isProgListVisible: false,
    };
  }

  showPrograms = () => {
    this.setState({ isProgListVisible: true });
  }

  addProgram = (name) => {
    this.props.addProgram(name);
    this.setState({ isProgListVisible: false });
  }

  render () {
    const { isProgListVisible } = this.state;
    const { departments: { department, addedPrograms } } = this.props;
    const { name, programs } = department || {};
    const currentBudget = (department && department.current_budget) || 0;
    const prevBudget = (department && department.prev_budget) || 0;
    const chartData = programs ? programs.map((program) => {
      const budgetFigure = program.budgets.filter((budget) => {
        return budget.year === 2017;
      }).map((budget) => {
        return budget.budget;
      });

      return { name: program.name, value: parseInt(budgetFigure[0], 10) };
    }) : null;
    const change = Math.round(
      ((parseFloat(currentBudget) / parseFloat(prevBudget)) - 1) * 100);

    return (
      <div className="programs">
        <h1 aria-label="Programs" className="programs__department-name">
          <i aria-hidden="true" className="material-icons">
            keyboard_arrow_right
          </i>
          { name }
        </h1>
        { !isProgListVisible && (
          <div>
            <div className="chart-area" tabIndex="0">
              <div className="chart-header">
                <div className="chart-header__budget-amount"><span>{`Budget 2016 / 2017: $${parseInt(currentBudget, 10)} million`}</span></div>
                <div className="chart-header__percentage-change"><span>Change from previous year <span className="chart-header__percentage-number">{`${change}%`}</span></span></div>
              </div>
              { chartData && (
                <div className="chart-widget">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={400} height={250} data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) }
            </div>
            <div className="select-program-area">
              <button
                role="button"
                className="button--add-programs"
                type="button"
                onClick={this.showPrograms}>
                <i className="material-icons">add_circle_outline</i>
                <span> Add a Program</span>
              </button>
            </div>
          </div>
        ) }
        { isProgListVisible && (
          <div className="photo-grid">
            <List
              items={programs}
              isPrograms
              addProgram={this.addProgram} />
          </div>
        ) }
        <ul className="program-list">
          { addedPrograms.map((program) => {
            return (
              <Program
                key={program.name}
                program={program}
                addDeliverable={this.addDeliverable} />
            );
          })
          }
        </ul>
        <div className="select-program-area">
          <button role="button" className="button--share" type="button">
            <span>Share</span>
            <i className="material-icons">share</i>
          </button>
        </div>
      </div>
    );
  }
}
