class HomeController < ApplicationController
  skip_before_filter :require_login

  def index
    if logged_in?
      render partial: "shared/main", layout: "application"
    else
      @user = User.new
      render partial: "shared/landing", layout: "application"
    end
  end

  def main
  end
end
