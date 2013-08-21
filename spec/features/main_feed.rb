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
    Sunspot.commit
    login(user)
    solr_setup
  end

  it "should have load the navigation" do
    page.should have_link('share_link', href: "#")
    page.should have_link('request_link', href: '#')
    page.should have_link('messages-nav', href: '/inbox')
  end
end
