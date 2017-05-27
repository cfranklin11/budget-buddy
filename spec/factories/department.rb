# frozen_string_literal: true

FactoryGirl.define do
  factory :department do
    name 'Department of Awesome'
    current_budget 2000
    prev_budget 1500

    transient do
      programs_count 1
    end

    after(:create) do |department, evaluator|
      create_list(:program, evaluator.programs_count, department: department)
    end
  end
end
