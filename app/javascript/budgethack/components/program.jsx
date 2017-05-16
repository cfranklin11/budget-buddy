import React, { PropTypes, Component } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

export default class Program extends Component {
  static propTypes = {
    program: PropTypes.object.isRequired,
  }

  render () {
    const { program: { budgets, name } } = this.props;
    const currentBudgets = budgets
      .filter((budget) => {
        return budget.year === '2018';
      })
      .map((budget) => { return budget.budget; });
    const currentBudget = currentBudgets.length > 0 ?
      currentBudgets.reduce((acc, curr) => acc + curr) : 0;
    const prevBudgets = budgets
      .filter((budget) => {
        return budget.year === '2017';
      })
      .map((budget) => { return budget.budget; });
    const prevBudget = prevBudgets.length > 0 ?
      prevBudgets.reduce((acc, curr) => acc + curr) : 0;
    const change = Math.round(((parseFloat(currentBudget) / parseFloat(prevBudget)) - 1) * 100);

    return (
      <div>
        <h1>{ name }</h1>
        <div>
          <div>
            <div>
              <div className="chart-header">
                <div className="chart-header__budget-amount"><span>{`Budget 2017 / 2018: $${currentBudget}`}</span></div>
                <div className="chart-header__percentage-change"><span>Change from previous year <span className="chart-header__percentage-number">{`${change}%`}</span></span></div>
              </div>
              <div className="chart-widget">
                { budgets && budgets.length > 0 && (
                  <ResponsiveContainer>
                    <BarChart width={750} height={250} data={budgets}>
                      <XAxis dataKey="year" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="budget" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
