# General helpers for getting data
module ApplicationHelper
  def departments_data
    Department.all.pluck(:name)
  end

  def department_data(department_name)
    Department.find_by(name: department_name)
  end
end
