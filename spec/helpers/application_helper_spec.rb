# frozen_string_literal: true

require 'rails_helper'

describe ApplicationHelper, type: :helper do
  describe '#departments_data' do
    it 'returns an array of department names' do
      departments_array = helper.departments_data

      expect(departments_array).to be_instance_of(Array)
      expect(departments_array.length).to be > 0

      departments_array.each { |dept| expect(dept).to be_instance_of(String) }
    end
  end

  describe '#department_data' do
    it 'returns a department data object' do
      department_record = create(:department)
      department_hash = helper.department_data(department_record.name)

      expect(department_hash).to include(
        name: department_record.name,
        current_budget: department_record.current_budget,
        prev_budget: department_record.prev_budget
      )

      program_record = department_record.programs.first
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
