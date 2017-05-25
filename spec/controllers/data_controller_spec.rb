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
      get :department, params: { department_name: 'Department of Health and Human Services' }
      expect(response.code).to eq('200')
      expect(response.content_type).to eq('application/json')
    end
  end
end
