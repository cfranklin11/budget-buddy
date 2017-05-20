# frozen_string_literal: true

# General helpers for getting data
module ApplicationHelper
  def departments_data
    Department.all.pluck(:name)
  end

  def department_data(department_name)
    department = Department.where(name: department_name)
      .includes(programs: [{ deliverables: :metrics }, :budgets]).try(:first)

    {
      name: department.name,
      current_budget: department.current_budget,
      prev_budget: department.prev_budget,
      id: department.id,
      programs: program_data(department.programs)
    }
  end

  private

  def program_data(programs)
    programs.map do |program|
      {
        description: program.description,
        name: program.name,
        id: program.id,
        budgets: program.budgets,
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
        metrics: deliverable.metrics,
        id: deliverable.id
      }
    end
  end
end
