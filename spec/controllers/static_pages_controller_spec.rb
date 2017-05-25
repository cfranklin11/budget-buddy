# frozen_string_literal: true

require 'rails_helper'

describe StaticPagesController do
  describe 'GET home' do
    it 'renders the homepage' do
      get :home
      expect(response.code).to eq('200')
      expect(response).to render_template('static_pages/home')
    end
  end
end
