class Deliverable < ApplicationRecord
  belongs_to :program
  has_many :metrics
end
