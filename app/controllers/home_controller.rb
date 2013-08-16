class HomeController < ApplicationController

  def index
    if logged_in?
      render "home/main"
    else
      render "home/landing"
    end
  end

end
