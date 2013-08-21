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
    solr_setup
    login(user)
  end

  describe "messaging" do
    it "inbox link should load" do
      page.should have_link 'messages-nav'
    end

    context "for a new message" do
      before :each do
        user.send_message(user, "body", "title")
      end
      it "inbox should show dropdown of message" do
        click_link 'messages-nav'
        
      end
    end
  end

end
