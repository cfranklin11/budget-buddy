/* eslint max-len: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line } from 'recharts';
import lineChartData from '../utils/data-utils';
import DeliverableList from './deliverable-list';
import DeliverableWidget from './deliverable-widget';

export default class ProgramWidget extends Component {
  static propTypes = {
    removeProgram: PropTypes.func,
    program: PropTypes.shape({
      budgets: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string,
      deliverables: PropTypes.arrayOf(PropTypes.object),
      percent_budget_change: PropTypes.number,
      current_budget: PropTypes.number,
      percent_budget_changes: PropTypes.arrayOf(PropTypes.object),
      percent_metric_changes: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }

  static defaultProps = {
    removeProgram: () => { return null; },
  };

  state = {
    isDelListVisible: false,
    addedDeliverables: [],
  }

  showDeliverables = () => {
    this.setState({ isDelListVisible: true });
  }

  addDeliverable = (deliverable, addedDeliverables) => {
    this.setState({
      isDelListVisible: false,
      addedDeliverables: addedDeliverables.concat(deliverable),
    });
  }

  removeProgram = (name) => {
    return () => {
      this.props.removeProgram(name);
    };
  }

  render () {
    const { isDelListVisible, addedDeliverables } = this.state;
    const { program: {
      budgets,
      name,
      deliverables,
      percent_budget_change,
      percent_budget_changes,
      percent_metric_changes,
      current_budget } } = this.props;
    const chartData = lineChartData(percent_budget_changes, percent_metric_changes);

    return (
      <div className="program-widget-area">
        <div className="program-chart-header">
          <div className="program-chart-header__title">
            { name }
          </div>
          <button
            className="button--remove-programs"
            onClick={ this.removeProgram(name) }>
            <i className="material-icons">remove_circle_outline</i>
            Remove program
          </button>
        </div>
        { !isDelListVisible && (
          <div>
            <div className="chart-header">
              <div className="chart-header__budget-amount">
                <span>
                  {`Budget 2016 / 2017: $${parseInt(current_budget, 10)} million`}
                </span>
              </div>
              <div className="chart-header__percentage-change">
                <span>
                  Change from previous year
                  <span
                    className="chart-header__percentage-number">
                    {`${percent_budget_change}%`}
                  </span>
                </span>
              </div>
            </div>
            <div>
              { budgets && budgets.length > 0 && (
                <div className="chart-widget">
                  <h2>Budgets by Year</h2>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={ 400 } height={ 250 } data={ budgets }>
                      <XAxis dataKey="year" />
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

            <div>
              { chartData && chartData.length > 0 && (
                <div className="chart-widget">
                  <div>
                    <h2>% Change: Budget vs Aggregate Output Measures</h2>
                    <LineChart
                      width={ 400 }
                      height={ 250 }
                      data={ chartData }
                      margin={ { top: 5, right: 30, left: 20, bottom: 5 } }>
                      <XAxis dataKey="year" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="budget" stroke="#8884d8" />
                      <Line type="monotone" dataKey="metric" stroke="#82ca9d" />
                    </LineChart>

                  </div>
                </div>
              ) }
            </div>
          </div>
        ) }
        { isDelListVisible && (
          <div className="content-wrapper">
            <DeliverableList
              items={ deliverables }
              addedDeliverables={ addedDeliverables }
              addDeliverable={ this.addDeliverable } />
          </div>
        ) }
        <div className="select-program-area">
          <button
            className="button--add-programs"
            type="button"
            onClick={ this.showDeliverables }>
            <i className="material-icons">add_circle_outline</i>
            <span> Add a Deliverable</span>
          </button>
        </div>
        <ul className="program-list">
          { addedDeliverables.map((deliverable) => {
            return (
              <DeliverableWidget
                key={ deliverable.id }
                deliverable={ deliverable }
                budgetChanges={ percent_budget_changes } />
            );
          }) }
        </ul>
      </div>
    );
  }
}
