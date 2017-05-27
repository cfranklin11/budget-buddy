# frozen_string_literal: true

require 'rails_helper'

describe DepartmentPresenter do
  before do
    @department = create(:department)
    @presenter = DepartmentPresenter.new(@department.name)
  end

  describe '#data' do
    it 'returns a department data object' do
      department_hash = @presenter.data

      expect(department_hash).to include(
        name: @department.name,
        current_budget: @department.current_budget,
        prev_budget: @department.prev_budget
      )

      program_record = @department.programs.first
      program_hash = department_hash[:programs].first
      expect(program_hash).to include(
        name: program_record.name,
        description: program_record.description
      )

      budget_record = program_record.budgets.first
      budget_hash = program_hash[:budgets].first
      expect(budget_hash).to include(
        budget: budget_record.budget,
        year: budget_record.year
      )

      deliverable_record = program_record.deliverables.first
      deliverable_hash = program_hash[:deliverables].first
      expect(deliverable_hash).to include(
        name: deliverable_record.name,
        metric_unit: deliverable_record.metric_unit,
        metric_type: deliverable_record.metric_type
      )

      metric_record = deliverable_record.metrics.first
      metric_hash = deliverable_hash[:metrics].first
      expect(metric_hash).to include(
        metric: metric_record.metric,
        year: metric_record.year
      )
    end
  end
end
