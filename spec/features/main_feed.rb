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
  let(:crop) {FactoryGirl.create(:crop)}
  let(:status) {FactoryGirl.create(:status)}

  before do
    user.create_geocode(lat: 38.024025, lng: -122.290589)
    p crop
    Supply.create(user: user, crop: crop, status: status)
    p user.supplies
    Sunspot.commit
    login(user)
    solr_setup
  end

  context "user supplies" do
    it "display user supplies" do
      click_link 'share_link'
      page.should have_content(crop.name)
      user.supplies.count.should eq 1
    end
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

    context "user supplies" do

      it "display user supplies" do
        click_link 'share_link'
        page.should have_content(crop.name)
        user.supplies.count.should eq 1
      end
    end
  end
end
