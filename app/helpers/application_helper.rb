# frozen_string_literal: true

# General helpers for getting data
module ApplicationHelper
  def department_data(department_name)
    department_hash(department_record(department_name))
  end

  private

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

  def department_record(department_name)
    Department.where(name: department_name).try(:includes, programs: [{ deliverables: :metrics }, :budgets]).first
  end

  def department_hash(department_record)
    if department_record
      {
        name: department_record.name,
        current_budget: department_record.current_budget,
        prev_budget: department_record.prev_budget,
        id: department_record.id,
        programs: program_data(department_record.programs)
      }
    else
      {}
    end
  end
end
