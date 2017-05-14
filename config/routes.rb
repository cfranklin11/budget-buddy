Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#home'

  get '/data/department', to: 'data#department'
  get '/data/departments', to: 'data#departments'
end
