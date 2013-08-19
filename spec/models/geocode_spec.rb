require 'spec_helper'

describe Geocode do
  
  it{should respond_to(:lat)}
  it{should respond_to(:lng)}
  it{should respond_to(:user)}

  let(:user) {FactoryGirl.create(:user)}
  let(:geocode) {FactoryGirl.build(:geocode)}
  
  describe "#initialize" do

    context "valid data" do
      it "should save to database" do
        user.geocode = geocode
        geocode.save.should eq true
      end
    end

    context "invalid data" do
      it "should not save to database" do
        geocode.save.should eq false
      end
    end
  end

  describe "#find_local_users" do
    include SolrSpecHelper
    let(:user) {FactoryGirl.create(:user)}
    let(:user2) {FactoryGirl.create(:user)}

    before { solr_setup }

    context "valid data" do
      before :each do
        user2.create_geocode(lat: 37.796453, lng: -122.428015)
        user.create_geocode(lat: 37.786453, lng: -122.418015)
        Sunspot.commit
      end

      it "should return an array" do
        expect(Geocode.find_local_users(37.786453, -122.418015, 10).class).to be Array
      end

      it "should return user objects" do
        expect(Geocode.find_local_users(37.786453, -122.418015, 10).last).to eq user
      end
    end

    context "when there are no results" do
      it "should return an empty array" do
        expect(Geocode.find_local_users(0, 0, 0)).to eq []
      end
    end
  end
end
