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
    describe "defaults" do
      before :each do
        fill_in "zip", with: "94547"
        click_button "Check"
        sleep(2)
      end

      it "should list 0 users when no matches" do
        expect(page).to have_content("0 gardeners")
      end

      it "should show signup link" do
        expect(page).to have_link('Signup')
      end
    end

    describe "feed" do
      include SolrSpecHelper
      let(:user) { FactoryGirl.create(:user) }
      let(:crop) { Crop.new(name: "Corn")}

      before :each do
        solr_setup
        user.supplies.create(crop: crop)
        user.create_geocode(lat: 37.786453, lng: -122.418015)
        Sunspot.commit
      end

      it "should list number of users in that area" do
        fill_in "zip", with: "94122"
        click_button "Check"
        sleep(2)
        expect(page).to have_content "gardeners near you"
      end

      it "should list what users in that area are growing" do
        fill_in "zip", with: "94122"
        click_button "Check"
        sleep(2)
        expect(page).to have_content "corn available"
      end
    end
  end
end
