# frozen_string_literal: true

# Return one department's data with associations
class DepartmentPresenter
  def initialize(department_name)
    @department = Department
      .where(name: department_name)
      .try(:includes, programs: [{ deliverables: :metrics }, :budgets])
      .first
  end

  def data
    @department ? department_data(@department) : {}
  end

  private

  def department_data(department_record)
    programs = program_data(department_record.programs)
    {
      name: department_record.name,
      current_budget: department_record.current_budget,
      prev_budget: department_record.prev_budget,
      percent_budget_change: percent_budget_change(department_record.prev_budget, department_record.current_budget),
      id: department_record.id,
      programs: programs,
      chart_data: current_program_budgets(programs)
    }
  end

  def current_program_budgets(programs)
    programs.map do |program|
      { name: program[:name], budget: current_metric(program[:budgets])[:budget] || 0 }
    end
  end

  def current_metric(metrics)
    year = max_year(metrics)
    filtered_metrics = metrics.select { |metric| metric[:year].to_i == year }
    filtered_metrics.first
  end

  def max_year(metrics)
    years = metrics.map { |metric| metric[:year].to_i }
    years.reduce { |memo, year| [memo, year].max }
  end

  def percent_budget_change(prev_budget, current_budget)
    (((current_budget.to_f / prev_budget.to_f) - 1) * 100).round
  end

  def program_data(programs)
    programs.map do |program|
      {
        description: program.description,
        name: program.name,
        id: program.id,
        budgets: budget_data(program.budgets),
        deliverables: deliverable_data(program.deliverables)
      }
    end
  end

  def deliverable_data(deliverables)
    deliverables.map do |deliverable|
      {
        name: deliverable.name,
        metric_unit: deliverable.metric_unit,
        metric_type: deliverable.metric_type,
        metrics: metric_data(deliverable.metrics),
        id: deliverable.id
      }
    end
  end

  def budget_data(budgets)
    budgets.map do |budget|
      {
        budget: budget.budget,
        year: budget.year,
        id: budget.id
      }
    end
  end

  def metric_data(metrics)
    metrics.map do |metric|
      {
        metric: metric.metric,
        year: metric.year,
        id: metric.id
      }
    end
  end
end
