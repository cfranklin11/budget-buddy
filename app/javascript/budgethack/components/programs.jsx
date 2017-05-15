import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import List from './list';


export default class Programs extends Component {
  static propTypes = {
    departments: PropTypes.object,
  }

  static defaultProps = {
    departments: {},
  }

  render () {
    const { data, currentDepartment } = this.props.departments;
    const department = data && data.filter((dept) => { return dept.name === currentDepartment; });
    const { name, programs } = department ? department[0] : {};
    const chartData = programs ? programs.map((program) => {
      const budgetFigure = program.budgets.filter((budget) => {
        return budget.year === '2018';
      });

      return { name: program.name, value: parseFloat(budgetFigure) };
    }) : null;

    return (
      <div>
        <h1>{ name }</h1>
        { chartData && (
          <BarChart width={100} height={25} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
          </BarChart>
        ) }
        <div>
          <ul>
            <li>BUDGET</li>
            <li>% YoY Change</li>
          </ul>
        </div>
        <h1>
          <Link to="/">Programs</Link>
        </h1>
        <div className="photo-grid">
          <List items={programs} />
        </div>
      </div>
    );
  }
}
