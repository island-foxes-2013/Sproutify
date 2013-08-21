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
        user.send_message(user, "Hey bro, I really need apples!", "Got any apples?")
        click_link 'messages-nav'
      end

      it "inbox should show dropdown of message" do
        page.should have_content('Got any apples?')
      end

      it "should show modal of exisiting message when clicked" do
        click_link 'Got any apples?'
        page.should have_content('Got any apples?')
        page.should have_content('Hey bro, I really need apples!')
      end

      context "replying to a message" do
        before :each do
          click_link 'Got any apples?'
        end

        it "should be successful" do
          fill_in 'email_title', with: "What kind of apples?"
          fill_in 'email_body', with: "I'll trade you apples for oranges."
          click_button 'Connect'
          page.should have_content('Your message has been sent!')
          expect(Conversation.all.count).to eq 4
        end
      end
    end
  end
end
