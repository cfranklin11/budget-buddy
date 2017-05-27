# frozen_string_literal: true

require 'rails_helper'

describe DataController do
  describe 'GET departments' do
    it 'returns json' do
      get :departments
      expect(response.code).to eq('200')
      expect(response.content_type).to eq('application/json')
    end
  end

  describe 'GET department' do
    it 'returns json' do
      allow(controller).to receive(:department_data).and_return(
        name: 'Department Name',
        current_budget: 2000,
        prev_budget: 1500,
        programs: []
      )

      get :department, params: { department_name: 'Department Name' }
      expect(response.code).to eq('200')
      expect(response.content_type).to eq('application/json')
    end
  end
end
