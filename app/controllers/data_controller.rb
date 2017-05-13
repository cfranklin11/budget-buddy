class DataController < ApplicationController
  def department_data
    @data = budget_data(budget_params[:department])
    render json: @data
  end

  private

  def budget_data(department)
    file_path = File.join(Rails.root, 'data/scripts', 'data_processor.py')
    data = %x(python #{file_path} '#{department}')
    data
  end

  def budget_params
    params.permit(:department)
  end
end
