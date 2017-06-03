# frozen_string_literal: true

FactoryGirl.define do
  factory :budget do
    sequence :budget do |n|
      1000 + (n * 10)
    end

    sequence :year do |n|
      2017 - n
    end
  end
end
