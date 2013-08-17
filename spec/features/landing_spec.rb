require 'spec_helper'

describe "Location hook" do
  before :each do
    visit root_path
  end

  context "valid location" do

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
