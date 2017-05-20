# Represents a budget item/program in a department
class Program < ApplicationRecord
  belongs_to :department
  has_many :budgets, :deliverables
end
