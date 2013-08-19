require 'spec_helper'

describe HomeController do

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

  describe '#find_in_box' do
    include SolrSpecHelper
    let(:user) {FactoryGirl.create(:user)}
    before { solr_setup }

    it "should respond nicely with valid params" do
      user.create_geocode(lat: 32.5, lng: -119.5)
      Sunspot.commit
      get :find_in_box, ulat: 32, ulng: -120, blat: 33, blng: -119 
      response.body
    end
  end
end