require 'spec_helper'

describe "map generation" do
  before :each do
    visit root_path
  end

  context "valid location", js:true do
    before do
      fill_in 'location', with: 'San Francisco'
      click_button 'Submit'
      sleep(3)
    end

    describe "map" do
      it "should generate a map" do
        page.should have_css('div.gm-style')
      end

      it "should generate map with correct location" do
        pending "validate with lat, lng"
      end

      it "should generate a map with users in respective area" do
        pending "validate with markers"
      end
    end

    describe "feed" do
      it "should list number of users in that area" do
        pending "can't implement without routes and DB"
      end

      it "should list what users in that area are growing" do
        pending "can't implement without routes and DB"
      end
    end
  end

  context "invalid input" do
    it "should not generate a map" do
      pending "page should not have a map and instead maybe an error message"
    end
  end
end
