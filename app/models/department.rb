# Model for Vic gov departments
class Department < ApplicationRecord
  has_many :programs
  accepts_nested_attributes_for :programs
end
