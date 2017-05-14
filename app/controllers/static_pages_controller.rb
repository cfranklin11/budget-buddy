class StaticPagesController < ApplicationController
  include ApplicationHelper

  def home
    @departments = departments
  end
end
