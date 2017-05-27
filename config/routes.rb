# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#home'

  get '/data/department', to: 'data#department_attributes'
  get '/data/departments', to: 'data#department_list'

  get '/:route', to: 'static_pages#home'
end
