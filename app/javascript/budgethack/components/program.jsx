import React, { PropTypes, Component } from 'react';
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

  export default class Program extends Component {
    static propTypes = {
      program: PropTypes.object.isRequired,
    }

    static years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008];

    percentBudgetChange = (budgets) => {
      const firstBudget = parseFloat(budgets[0].budget);
      const firstBudgetNumber = isNaN(firstBudget) ? 1 : firstBudget;

      const percentChanges = budgets.map((budget) => {
        const thisBudget = parseFloat(budget.budget);
        const budgetNumber = isNaN(thisBudget) ? 0 : thisBudget;
        const percentChange = Math.round(((budgetNumber / firstBudgetNumber) - 1) * 100);

        return { year: budget.year, budget: percentChange };
      });

      return percentChanges;
    }

    percentMetricChange = (metrics) => {
      const firstMetric = parseFloat(metrics[0].metric);
      const firstMetricNumber = isNaN(firstMetric) ? 1 : firstMetric;

      const percentChanges = metrics.map((metric) => {
        const thisMetric = parseFloat(metric.metric);
        const metricNumber = isNaN(thisMetric) ? 0 : thisMetric;
        const percentChange = Math.round(((metricNumber / firstMetricNumber) - 1) * 100);

        return { year: metric.year, metric: percentChange };
      });

      return percentChanges;
    }

    lineChartData = (budgetChanges, metricChanges) => {
      const chartData = budgetChanges.map((budget, index) => {
        const metric = metricChanges.length > index ? metricChanges[index].metric : 0;
        return { year: budget.year, budget: budget.budget, metric };
      });

      return chartData;
    }

    metricsByYear = (deliverables) => {
      const qtyDeliverables = deliverables.filter((deliverable) => {
        return deliverable.metric_type === 'Quantity';
      });
      // const qltyDeliverables = deliverables.filter((deliverable) => {
      //   return deliverable.metric_type === 'Quality';
      // });
      const qtyMetrics = qtyDeliverables.map((deliverable) => {
        return deliverable.metrics;
      }).reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);

      // .reduce((acc, deliverable) => {
      //   acc.concat(deliverable.metrics);
      // }, []);
      const metricObj = {};

      for (let i = 0; i < qtyMetrics.length; i++) {
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

      for (let i = 0; i < keys.length; i++) {
        metricArray[metricArray.length] = { year: keys[i], metric: metricObj[keys[i]] };
      }

      return metricArray;
    }

    render () {
      const { program: { budgets, name, deliverables } } = this.props;
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
      const metrics = this.metricsByYear(deliverables);
      const chartData = this.lineChartData(
        this.percentBudgetChange(budgets),
        this.percentMetricChange(metrics));

      return (
        <div>
          <span className="program-chart-header__title">
            { name }
          </span>
          <div>
            <div className="chart-header">
              <div className="chart-header__budget-amount"><span>{`Budget 2017 / 2018: $${currentBudget}`}</span></div>
              <div className="chart-header__percentage-change"><span>Change from previous year <span className="chart-header__percentage-number">{`${change}%`}</span></span></div>
            </div>

            <div className="chart-widget">
              { budgets && budgets.length > 0 && (
                <div>
                  <h2>Budgets by Year</h2>

                  <BarChart width={750} height={250} data={budgets}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" />
                  </BarChart>

                </div>
              ) }
            </div>

            <div className="chart-widget">
              { chartData && chartData.length > 0 && (
                <div>
                  <h2>% Change: Budget vs Output Measures</h2>
                  <LineChart
                    width={750}
                    height={250}
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="year" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="budget" stroke="#8884d8" />
                    <Line type="monotone" dataKey="metric" stroke="#82ca9d" />
                  </LineChart>
                </div>
                ) }
            </div>
          </div>
        </div>
      );
    }
  }
