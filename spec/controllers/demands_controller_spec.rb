require 'spec_helper'

describe DemandsController do
  let(:user) {FactoryGirl.create(:user)}
  include SolrSpecHelper

  describe '#create' do
    let(:crop) {FactoryGirl.build(:crop)}

    before do
      session[:user_id] = user.id #Simulates login for user
      user.create_geocode(lat: 32.5, lng: -119.5)
      Sunspot.commit
      solr_setup
    end

    context "valid crop" do
      it "should be created if it doesn't exists" do
        expect{post :create, demand_crop_name: crop.name}.to change{Crop.all.count}.by(1)
      end
    end

    context "demand" do
      let(:crop2) {FactoryGirl.build(:crop)}

      it "should be created with valid crop" do
        expect{post :create, demand_crop_name: crop2.name}.to change{user.demands.count}.by(1)
      end
    end
  end

  describe "#destroy" do
    
  end
end
