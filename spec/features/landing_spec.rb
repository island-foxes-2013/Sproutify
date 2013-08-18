require 'spec_helper'

describe "Landing Page", js:true do
  before :each do
    visit root_path
  end

  subject {page}

  it {should have_button('Check')}
  it {should have_content('Find Gardeners near you')}
  it {should have_field('zip')}
  it {should have_field('address')}

  context "when logged out" do
    it {should have_link('Login')}
  end

  context "valid location" do

    describe "feed" do
      include SolrSpecHelper
      let(:user) { FactoryGirl.create(:user) }

      before {
        solr_setup
      }

      it "should list number of users in that area" do
        user.create_geocode(lat: 37.786453, lng: -122.418015)
        Sunspot.commit
        fill_in "zip", with: "94122"
        click_button "Check"
        sleep(4)
        expect(page).to have_content "1 gardeners near you"
      end

      it "should list what users in that area are growing" do
        pending "need solr rspec connection"
      end

      it "should list 0 users when no matches" do
        pending "need solr rspec connection"
      end
    end
  end

end
