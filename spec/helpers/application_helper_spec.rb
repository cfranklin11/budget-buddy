# frozen_string_literal: true

require 'rails_helper'

describe ApplicationHelper, type: :helper do
  describe '#departments_data' do
    it 'returns an array of department names' do
      departments_array = helper.departments_data

      expect(departments_array).to be_instance_of(Array)
      expect(departments_array.length).to be > 0

      departments_array.each { |dept| expect(dept).to be_instance_of(String) }
    end
  end
end
