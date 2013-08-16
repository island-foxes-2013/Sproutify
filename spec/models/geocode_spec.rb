require 'spec_helper'

describe Geocode do
  
  it{should respond_to(:lat)}
  it{should respond_to(:lng)}
  it{should respond_to(:user)}

  let(:user) {FactoryGirl.create(:user)}
  let(:geocode) {FactoryGirl.build(:geocode)}

  describe "#initialize" do

    context "valid data" do
      it "should save to database" do
        user.geocode = geocode
        geocode.save.should eq true
      end
    end

    context "invalid data" do
      it "should not save to database" do
        geocode.save.should eq false
      end
    end
  end
end
