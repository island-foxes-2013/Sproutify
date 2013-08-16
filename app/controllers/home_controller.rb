class HomeController < ApplicationController
  skip_before_filter :require_login

  def index
    if logged_in?
      render "home/main"
    else
      @user = User.new
      render "home/landing"
    end
  end

  def main
  end
end
