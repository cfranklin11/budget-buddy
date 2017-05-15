import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import List from './list';
import Program from './program';

export default class Programs extends Component {
  static propTypes = {
    departments: PropTypes.object,
    addProgram: PropTypes.func,
    addedPrograms: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    departments: {},
    addedPrograms: [],
  }

  constructor () {
    super();

    this.state = {
      isListVisible: false,
    };
  }

  showPrograms = () => {
    this.setState({ isListVisible: true });
  }

  addProgram = (name) => {
    this.props.addProgram(name);
    this.setState({ isListVisible: false });
  }

  render () {
    const { departments: { data, currentDepartment, addedPrograms } } = this.props;
    const department = data && data.filter((dept) => { return dept.name === currentDepartment; });
    const { name, programs } = department ? department[0] : {};
    const budgets = programs ? programs.map((program) => { return program.budgets; }) : [];
    const flatBudgets = [].concat(...budgets);
    const currentBudgets = flatBudgets
      .filter((budget) => {
        return budget.year === '2018';
      })
      .map((budget) => { return budget.metric; });
    const currentBudget = currentBudgets.length > 0 ?
      currentBudgets.reduce((acc, curr) => acc + curr) : 0;
    const prevBudgets = flatBudgets
      .filter((budget) => {
        return budget.year === '2017';
      })
      .map((budget) => { return budget.metric; });
    const prevBudget = prevBudgets.length > 0 ?
      prevBudgets.reduce((acc, curr) => acc + curr) : 0;
    const chartData = programs ? programs.map((program) => {
      const budgetFigure = program.budgets.filter((budget) => {
        return budget.year === '2018';
      }).map((budget) => {
        return budget.metric;
      });

      return { name: program.name, value: parseFloat(budgetFigure[0]) };
    }) : null;
    const change = Math.round(((parseFloat(currentBudget) / parseFloat(prevBudget)) - 1) * 100);

    return (
      <div className="programs">
        <h1 className="programs__department-name">
          <img className="programs__icon" src="http://placehold.it/36x36" />
          { name }
        </h1>
        { !this.state.isListVisible && (
          <div>
            { chartData && (
              <BarChart width={750} height={250} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            ) }
            <div>
              <ul>
                <li>{`2017/18 Budget: $${currentBudget}`}</li>
                <li>{`Change from Prev. Year: ${change}%`}</li>
              </ul>
            </div>
            <h1>
              <Link to="/">Programs</Link>

            </h1>
            <ul>
              { addedPrograms.map((program, index) => {
                return (<Program key={index} name={program.name} />);
              })
              }
            </ul>
            <h2 className="list__title">
              Select a Program:
            </h2>
            <button type="button" onClick={this.showPrograms}>Add a Program</button>
          </div>
        ) }
        <div className="photo-grid">
          { this.state.isListVisible && (
            <List
              items={programs}
              isPrograms
              addProgram={this.addProgram}
            />
          ) }
        </div>
      </div>
    );
  }
}
