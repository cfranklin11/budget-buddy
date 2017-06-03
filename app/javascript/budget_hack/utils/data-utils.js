export default function lineChartData (budgetChanges, metricChanges) {
  return budgetChanges.map((budget, index) => {
    return {
      year: budget.year,
      budget: budget.percent_change,
      metric: metricChanges[index] ? metricChanges[index].percent_change : 0,
    };
  });
}
