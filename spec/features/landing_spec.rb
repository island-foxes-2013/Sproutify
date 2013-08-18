require 'spec_helper'

describe "Landing page", js:true do
  before :each do
    visit root_path
  end

  subject {page}

  it {should have_button('Check')}
  it {should have_content("Find Gardeners near you")}
  it {should have_field("zip")}
  it {should have_field("address")}

  context "logged out" do
    it {should have_link("Login")}
  end

  describe "feed" do
    let!(:user) { FactoryGirl.create(:user) }
    # user.create_geocode(lat: 37.786453, lng: -122.418015)
    context "valid location" do

      it "should list number of users in that area" do
        pending "need solr/rspec connection"
      #   fill_in "zip", with: "94122"
      #   click_button "submit"
      #   sleep(2)
      #   save_and_open_page
      #   expect(page).to have_content("There are 0 gardeners in your area!")
      end

      it "should list what users in that area are growing" do
        pending "need solr/rspec connection"
      end

      it "should list 0 users when no matches" do
        pending "need solr/rspec connection"
      end
    end
  end
end
