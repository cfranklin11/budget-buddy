# Model for Vic gov departments
class Department < ApplicationRecord
  has_many :programs
end
