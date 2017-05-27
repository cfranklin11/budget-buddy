# frozen_string_literal: true

require 'rails_helper'

describe DataController do
  describe 'GET departments' do
    it 'returns json' do
      get :department_list
      expect(response.code).to eq('200')
      expect(response.content_type).to eq('application/json')
      expect(JSON.parse(response.body).length).to be > 0
    end
  end

  describe 'GET department' do
    it 'returns json' do
      department_record = create(:department)

      get :department_attributes, params: { department_name: department_record.name }
      expect(response.code).to eq('200')
      expect(response.content_type).to eq('application/json')
    end
  end
end
