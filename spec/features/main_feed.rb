require 'spec_helper'

def login(user)
  visit root_path
  click_link "Login"
  fill_in "session[email]", with: user.email
  fill_in "session[password]", with: user.password
  click_button "Login"
end

describe "main page", js:true do
  include SolrSpecHelper
  let(:user) {FactoryGirl.create(:user)}

  before do
    user.create_geocode(lat: 38.024025, lng: -122.290589)
    Sunspot.commit
    login(user)
    solr_setup
  end

  context "supply/demand control" do

    it "should load" do
      page.should have_content("What produce are you looking for?")
      page.should have_content("What produce do you have available?")
      page.should have_css('#add-demands-form')
      page.should have_css('#add-supplies-form')
    end

    it "should write and display updated demands" do
      fill_in "demand_crop_name", with: "Apple"
      click_button "Add Demand"
      # to change{user.demands.count}.by(1)
      page.should have_content("Apple")
      user.demands.count.should eq 1
    end

     it "should write and display updated supplies" do
      fill_in "supply_crop_name", with: "Orange"
      click_button "Add Supply"
      # to change{user.supplies.count}.by(1)
      page.should have_content("Orange")
      user.supplies.count.should eq 1
    end
  end
end
