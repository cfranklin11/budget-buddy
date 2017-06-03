# frozen_string_literal: true

FactoryGirl.define do
  factory :deliverable do
    name 'Awesomeness Generated'
    metric_type 'Quantity'
    metric_unit 'number'

    transient do
      metrics_count 5
    end

    after(:create) do |deliverable, evaluator|
      create_list(:metric, evaluator.metrics_count, deliverable: deliverable)
    end
  end
end
