class SessionsController < ApplicationController

  def index
    if logged_in?
      render :main
    else
      render :landing
    end
  end

end
