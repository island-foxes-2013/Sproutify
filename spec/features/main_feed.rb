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

  it "should have load the navigation" do
    page.should have_link('share_link', href: "#")
    page.should have_link('request_link', href: '#')
    page.should have_link('messages-nav', href: '/inbox')
  end

  context "supply/demand control" do

    it "should load" do
      page.should have_content("What produce do you have available?")
    end

    it "should write and display updated supplies" do
      fill_in "supply_crop_name", with: "orange"
      click_button "Add Supply"
      click_link 'share_link'
      page.should have_content("oranges")
      user.demands.count.should eq 1
    end

    # it "should allow user to select status of supply" do
    #   fill_in "supply_crop_name", with: "Avocado"
    #   select 'Harvested', from: 'status_name'
    #   click_button "Add Supply"
    #   page.should have_content("Avocado")
    #   user.supplies.count.should eq 1
    # end
  end
end
