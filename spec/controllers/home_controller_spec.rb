require 'spec_helper'

describe HomeController do

  describe '#index' do
    it "should create a new User if not logged in" do
      get :index
    end
  end

  describe '#fetch' do

    it "should respond to a get request" do
      get :fetch
      expect(response.status).to eq 200
    end

    it "should render json" do
      get :fetch, lat: 34, lng: -120
      body = JSON.parse(response.body)
      body["user_count"].should be_a Integer
    end

  end
end
