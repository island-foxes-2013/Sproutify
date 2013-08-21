require 'spec-helper'

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

  describe "messaging" do
    context "messaging" do
      
    end
  end

end
