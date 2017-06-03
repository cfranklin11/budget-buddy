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
        :name,
        :current_budget,
        :percent_budget_change,
        :programs,
        :chart_data
      )
      expect(department_hash[:name]).to eq(@department.name)
      expect(department_hash[:current_budget]).to eq(@department.current_budget)
      expect(department_hash[:chart_data].count).to be > 0

      program_record = @department.programs.first
      program_hash = department_hash[:programs].first
      expect(program_hash).to include(
        :name,
        :description,
        :current_budget,
        :percent_budget_change,
        :budgets,
        :deliverables,
        :percent_budget_changes,
        :percent_metric_changes
      )
      expect(program_hash[:name]).to eq(program_record.name)
      expect(program_hash[:description]).to eq(program_record.description)
      expect(program_hash[:current_budget]).to eq(1010)
      expect(program_hash[:percent_budget_change]).to eq((((1010.0 / 1020.0) - 1) * 100).round)
      expect(program_hash[:percent_budget_changes].count).to eq(program_hash[:budgets].count)
      expect(program_hash[:percent_metric_changes].count).to eq(program_hash[:budgets].count)

      budget_record = program_record.budgets.first
      budget_hash = program_hash[:budgets].first
      expect(budget_hash).to include(
        budget: budget_record.budget,
        year: budget_record.year
      )

      deliverable_record = program_record.deliverables.first
      deliverable_hash = program_hash[:deliverables].first
      expect(deliverable_hash).to include(
        :name,
        :metric_unit,
        :metric_type,
        :percent_metric_changes,
      )
      expect(deliverable_hash[:name]).to eq(deliverable_record.name)
      expect(deliverable_hash[:metric_unit]).to eq(deliverable_record.metric_unit)
      expect(deliverable_hash[:metric_type]).to eq(deliverable_record.metric_type)
      expect(deliverable_hash[:percent_metric_changes].count).to be > 0

      metric_changes_hash = deliverable_hash[:percent_metric_changes].first
      expect(metric_changes_hash).to include(:year, :percent_change)
    end
  end
end
