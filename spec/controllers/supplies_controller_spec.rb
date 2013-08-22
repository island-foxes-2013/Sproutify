require 'spec_helper'

describe SuppliesController do
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
        expect{post :create, supply_crop_name: crop.name}.to change{Crop.all.count}.by(1)
      end
    end

    context "valid status" do
      let(:crop2) {FactoryGirl.build(:crop)}

      it "should be create if it doesn't exist with a valid crop" do
        expect{post :create, supply_crop_name: crop2.name, status_name: "growing in my home"}.to change{Status.all.count}.by(1)
      end
    end
  end

  describe "#update" do
    let(:crop3) {FactoryGirl.create(:crop)}
    let(:status) {Status.create(name: "BLAH BLAH BLAH")}
    let(:supply) {FactoryGirl.build(:supply)}

    before do
      supply.user   = user
      supply.crop   = crop3
      supply.status = status
      supply.save
    end

    it "should update status" do
      expect{put :update, id: supply.id, status: "New updated status!"}.to change{Supply.find_by_id(supply.id).status.name}.from("blah blah blah").to("new updated status!")
    end

    it "should return error message if can't be found" do
      error = {errors: ["Update error"]}.to_json
      put :update, id: 99999, status: ""
      response.body.should == error
    end
  end
end
