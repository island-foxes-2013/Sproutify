require 'spec_helper'

describe "map generation" do
  before :each do
    visit root_path
  end

  context "valid location", js:true do

    describe "feed" do
      it "should list number of users in that area" do
        pending "can't implement without routes and DB"
      end

      it "should list what users in that area are growing" do
        pending "can't implement without routes and DB"
      end
    end
  end

end
