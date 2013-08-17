require 'spec_helper'

describe "Location hook" do
  before :each do
    visit root_path
  end

  context "valid location", js:true do
    describe "feed" do
      let(:user) { FactoryGirl.create(:user) }
      # user.create_geocode(lat: 37.786453, lng: -122.418015)

      it "should list number of users in that area" do
        expect do
          fill_in "location", with: "San Francisco"
            click_button "submit"
            sleep(3)
        end.to change{ page.has_content?("There are 1 gardeners in your area!")}
      end

      it "should list what users in that area are growing" do
        pending "can't implement without routes and DB"
      end

      it "should list 0 users when no matches" do
        pending "need to get capybara working"
        # fill_in "location", with: "Hercules"
        # click_button "submit"
        # sleep(1)
        # page.should have_content "There are 0 gardeners in your area!"
      end
    end
  end

end
