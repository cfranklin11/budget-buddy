# frozen_string_literal: true

FactoryGirl.define do
  factory :metric do
    sequence :metric do |n|
      500 + (n * 10)
    end

    sequence :year do |n|
      2017 - n
    end
  end
end
