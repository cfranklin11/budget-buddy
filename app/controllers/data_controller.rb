class DataController < ApplicationController
  include ApplicationHelper

  def departments
    @departments = JSON.parse(departments_data)
    # departments_json = @departments.map{ |dept| { value: dept } }

    render json: @departments
  end

  def department
    @data = department_data(budget_params[:department_name])

    render json: @data
  end

  private

  def budget_params
    params.permit(:department_name)
  end
end
