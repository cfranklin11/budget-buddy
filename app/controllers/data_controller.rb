# frozen_string_literal: true

# Controller for sending data to React app
class DataController < ApplicationController
  include ApplicationHelper

  def department_list
    render json: Department.all.pluck(:name)
  end

  def department_attributes
    render json: department_data(budget_params[:department_name])
  end

  private

  def budget_params
    params.permit(:department_name)
  end
end
