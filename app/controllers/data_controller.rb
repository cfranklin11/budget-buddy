# frozen_string_literal: true

# Controller for sending data to React app
class DataController < ApplicationController
  def department_list
    render json: Department.all.pluck(:name)
  end

  def department_attributes
    render json: DepartmentPresenter.new(budget_params[:department_name]).data
  end

  private

  def budget_params
    params.permit(:department_name)
  end
end
