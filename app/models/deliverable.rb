# Represents a output measure for a program
class Deliverable < ApplicationRecord
  belongs_to :program
  has_many :metrics
  accepts_nested_attributes_for :metrics
end
