# Represents a budget item/program in a department
class Program < ApplicationRecord
  belongs_to :department
  has_many :budgets
  has_many :deliverables
  accepts_nested_attributes_for :budgets
  accepts_nested_attributes_for :deliverables
end
