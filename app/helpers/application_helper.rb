module ApplicationHelper
  def datas
    [{
      name: 'Department of Health and Human Services',
      current_budget: 2367438,
      prev_budget: 2374953,
      programs: [
        {
          name: 'program 1',
          description: 'program description',
          budgets: [
              { year: '2018', metric: 357},
              { year: '2017', metric: 674},
              { year: '2016', metric: 305},
              { year: '2015', metric: 973},
              { year: '2014', metric: 276},
              { year: '2013', metric: 936},
          ],
          deliverables: [
            {
              name: 'deliverable name',
              metrics: [
                { year: '2018', metric: 876},
                { year: '2017', metric: 356},
                { year: '2016', metric: 247},
                { year: '2015', metric: 953},
                { year: '2014', metric: 294},
                { year: '2013', metric: 285},
              ],
              metric_units: 'number',
              metric_type: 'Quantity',
              regression_slope: 5,
            }
          ]
        },
        {
          name: 'program 2',
          description: 'program description',
          budgets: [
              { year: '2018', metric: 357},
              { year: '2017', metric: 674},
              { year: '2016', metric: 305},
              { year: '2015', metric: 973},
              { year: '2014', metric: 276},
              { year: '2013', metric: 936},
          ],
          deliverables: [
            {
              name: 'deliverable name',
              metrics: [
                { year: '2018', metric: 876},
                { year: '2017', metric: 356},
                { year: '2016', metric: 247},
                { year: '2015', metric: 953},
                { year: '2014', metric: 294},
                { year: '2013', metric: 285},
              ],
              metric_units: 'number',
              metric_type: 'Quantity',
              regression_slope: 5,
            }
          ]
        }
      ]
    }]
  end

  def departments_data
    file_path = File.join(Rails.root, 'data/scripts', 'data_processor.py')
    data = %x(python #{file_path})
    data
  end

  def department_data(department_name)
    # file_path = File.join(Rails.root, 'data/scripts', 'data_processor.py')
    # data = %x(python #{file_path} '#{department_name}')
    # data
    datas
  end
end
