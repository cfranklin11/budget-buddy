# frozen_string_literal: true

FactoryGirl.define do
  factory :program do
    name 'Awesome Program'
    description 'A program to promote awesomeness'

    transient do
      budgets_count 5
      deliverables_count 1
    end

    after(:create) do |program, evaluator|
      create_list(:budget, evaluator.budgets_count, program: program)
      create_list(:deliverable, evaluator.deliverables_count, program: program)
    end
  end
end
