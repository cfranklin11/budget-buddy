class DataController < ApplicationController
  include ApplicationHelper

  def department
    @data = department_data(budget_params[:department_name])

    render json: @data
  end

  private

  def budget_params
    params.permit(:department_name)
  end
end
