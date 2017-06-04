import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer } from 'recharts';

export default class DepartmentWidget extends Component {
  static propTypes = {
    departments: PropTypes.shape({
      currentDepartment: PropTypes.string,
      department: PropTypes.object,
      list: PropTypes.arrayOf(PropTypes.string),
    }),
  }
  static defaultProps = {
    departments: {},
  }

  render () {
    const {
      departments: { department },
    } = this.props;

    const { name, chart_data } = department || {};
    const currentBudget = (department && department.current_budget) || 0;
    const percentBudgetChange =
      (department && department.percent_budget_change) || 0;

    return (
      <div className="programs">
        <h1 aria-label="Programs" className="programs__department-name">
          <i aria-hidden="true" className="material-icons">
            keyboard_arrow_right
          </i>
          { name }
        </h1>
        <div className="chart-area">
          <div className="chart-header">
            <div className="chart-header__budget-amount">
              <span>
                {`Budget 2016 / 2017: $${parseInt(currentBudget, 10)} million`}
              </span>
            </div>
            <div className="chart-header__percentage-change">
              <span>
                Change from previous year
                <span className="chart-header__percentage-number">
                  {`${percentBudgetChange}%`}
                </span>
              </span>
            </div>
          </div>
          { chart_data && (
            <div className="chart-widget">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={ 400 } height={ 250 } data={ chart_data }>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="budget" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) }
        </div>
      </div>
    );
  }
}
