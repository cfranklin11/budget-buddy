# Controller for sending data to React app
class DataController < ApplicationController
  include ApplicationHelper

  def departments
    render json: departments_data
  end

  def department
    render json: department_data(budget_params[:department_name])
  end

  private

  def budget_params
    params.permit(:department_name)
  end
end
