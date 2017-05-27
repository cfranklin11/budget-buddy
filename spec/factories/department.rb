# frozen_string_literal: true

FactoryGirl.define do
  factory :department do
    name 'Department of Awesome'
    current_budget 2000
    prev_budget 1500
  end
end
