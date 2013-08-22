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
    let(:demand) {FactoryGirl.build(:demand)}
    let(:crop3) {FactoryGirl.build(:crop)}

    before do
      demand
      demand.user = user
      demand.crop = crop3
      demand.save
      p demand
      p demand.id
    end

    it "should delete demand" do
      expect do
        delete :destroy, id: demand.id
      end.to change{Demand.count}.by(-1)
    end

    it "should return delete error" do
      error = {errors: ["Deletion error"]}.to_json
      delete :destroy, id: 999999
    end
  end
end
