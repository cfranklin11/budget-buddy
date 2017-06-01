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
import DeliverableList from './deliverable-list';
import DeliverableWidget from './deliverable-widget';

export default class ProgramWidget extends Component {
  static propTypes = {
    removeProgram: PropTypes.func,
    program: PropTypes.shape({
      budgets: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string,
      deliverables: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }

  static defaultProps = {
    removeProgram: () => { return null; },
  };

  state = {
    isDelListVisible: false,
    addedDeliverables: [],
  }

  percentBudgetChange = (budgets) => {
    const firstBudget = parseFloat(budgets[0].budget);
    const firstBudgetNumber = isNaN(firstBudget) ? 1 : firstBudget;

    const percentChanges = budgets.map((budget) => {
      const thisBudget = parseFloat(budget.budget);
      const budgetNumber = isNaN(thisBudget) ? 0 : thisBudget;
      const percentChange = Math.round(
        ((budgetNumber / firstBudgetNumber) - 1) * 100);

      return { year: budget.year, budget: percentChange };
    });

    return percentChanges;
  }

  percentMetricChange = (metrics) => {
    const firstMetric = (metrics && metrics.length > 0 &&
      parseFloat(metrics[0].metric)) || 0;
    const firstMetricNumber = isNaN(firstMetric) ? 1 : firstMetric;

    const percentChanges = metrics.map((metric) => {
      const thisMetric = parseFloat(metric.metric);
      const metricNumber = isNaN(thisMetric) ? 0 : thisMetric;
      const percentChange = Math.round(
        ((metricNumber / firstMetricNumber) - 1) * 100);

      return { year: metric.year, metric: percentChange };
    });

    return percentChanges;
  }

  lineChartData = (budgetChanges, metricChanges) => {
    const chartData = budgetChanges.map((budget, index) => {
      const metric = metricChanges.length > index ?
      metricChanges[index].metric :
      0;

      return { year: budget.year, budget: budget.budget, metric };
    });

    return chartData;
  }

  metricsByYear = (deliverables) => {
    const qtyDeliverables = deliverables.filter((deliverable) => {
      return deliverable.metric_type === 'Quantity';
    });
    const qtyMetrics = qtyDeliverables.map((deliverable) => {
      return deliverable.metrics;
    }).reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
    const metricObj = {};

    for (let i = 0; i < qtyMetrics.length; i += 1) {
      const metric = qtyMetrics[i];
      const thisMetric = parseFloat(metric.metric);
      const metricNumber = isNaN(thisMetric) ? 0 : thisMetric;

      if (metricObj[metric.year]) {
        metricObj[metric.year] += metricNumber;
      } else {
        metricObj[metric.year] = metricNumber;
      }
    }

    const metricArray = [];
    const keys = Object.keys(metricObj);

    for (let i = 0; i < keys.length; i += 1) {
      metricArray[metricArray.length] = {
        year: keys[i],
        metric: metricObj[keys[i]],
      };
    }

    return metricArray;
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
    const { program: { budgets, name, deliverables } } = this.props;
    const currentBudgets = budgets
      .filter((budget) => {
        return budget.year === 2017;
      })
      .map((budget) => { return budget.budget; });
    const currentBudget = currentBudgets.length > 0 ?
      currentBudgets.reduce((acc, curr) => { return acc + curr; }) :
      0;
    const prevBudgets = budgets
      .filter((budget) => {
        return budget.year === 2016;
      })
      .map((budget) => { return budget.budget; });
    const prevBudget = prevBudgets.length > 0 ?
      prevBudgets.reduce((acc, curr) => { return acc + curr; }) :
      0;
    const change = Math.round(
      ((parseFloat(currentBudget) / parseFloat(prevBudget)) - 1) * 100);
    const metrics = this.metricsByYear(deliverables);
    const percentBudgetChanges = this.percentBudgetChange(budgets);
    const chartData = this.lineChartData(
      percentBudgetChanges,
      this.percentMetricChange(metrics));

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
                  {`Budget 2016 / 2017: $${parseInt(currentBudget, 10)} million`}
                </span>
              </div>
              <div className="chart-header__percentage-change">
                <span>
                  Change from previous year
                  <span
                    className="chart-header__percentage-number">
                    {`${change}%`}
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
                budgets={ percentBudgetChanges } />
            );
          }) }
        </ul>
      </div>
    );
  }
}
