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
      percent_budget_change: percent_change(department_record.current_budget, department_record.prev_budget),
      id: department_record.id,
      programs: programs,
      chart_data: current_program_budgets(programs)
    }
  end

  def current_program_budgets(programs)
    programs.map do |program|
      { name: program[:name], budget: current_metric(program[:budgets], :budget) || 0 }
    end
  end

  def current_metric(metrics, label)
    current_year = selected_year(metrics, metrics.count - 1)
    filtered_metrics = metrics.select { |metric| metric[:year].to_i == current_year }
    filtered_metrics.first.fetch(label.to_sym)
  end

  def selected_year(metrics, index)
    years = metrics.map { |metric| metric[:year].to_i }
    years.sort[index]
  end

  def prev_metric(metrics, label)
    prev_year = selected_year(metrics, metrics.count - 2)
    filtered_metrics = metrics.select { |metric| metric[:year].to_i == prev_year }
    filtered_metrics.first.fetch(label.to_sym)
  end

  def percent_change(current_metric, prev_metric)
    (((current_metric.to_f / prev_metric.to_f) - 1) * 100).round
  end

  def program_data(programs)
    programs.map do |program|
      budgets_array = budget_data(program.budgets)
      current_budget = current_metric(budgets_array, :budget)

      {
        description: program.description,
        name: program.name,
        id: program.id,
        current_budget: current_budget,
        percent_budget_change: percent_change(current_budget, prev_metric(budgets_array, :budget)),
        budgets: budgets_array,
        deliverables: deliverable_data(program.deliverables),
        percent_budget_changes: percent_changes(budgets_array, :budget)
      }
    end
  end

  def percent_changes(metrics, label)
    oldest = oldest_metric(metrics, label)
    metrics.map do |metric|
      { year: metric[:year], percent_change: percent_change(metric.fetch(label.to_sym), oldest) }
    end
  end

  def oldest_metric(metrics, label)
    min_year = selected_year(metrics, 0)
    filtered_metrics = metrics.select { |metric| metric[:year].to_i == min_year }
    filtered_metrics.first.fetch(label.to_sym)
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
