require 'spec_helper'

describe Crop do
  
  it {should respond_to(:name)}
  it {should respond_to(:supplies)}
  it {should respond_to(:demands)}

  let(:crop) {Crop.new}
  let(:crop2) {Crop.new}
  let(:user) { FactoryGirl.create(:user) }

  describe "#initialize" do

    context "valid data" do
      it "should save to database" do
        crop.name = "Corn"
        crop.save.should eq true
      end
    end

    context "invalid data" do
      it "should not save to database" do
        crop.save.should eq false
      end

      it "should not allow duplicate entries" do
        crop.name = "Corn"
        crop.save
        crop2.name = "Corn"
        crop2.save.should eq false
      end
    end
  end

  describe "#number_supplied" do
    before do
      user.supplies.create(crop: crop)
    end

    it "should return correct count of users' supplies for respective crop" do
      expect(crop.number_supplied([user])).to eq 1
    end
  end

  describe "#number_demanded" do
    before do
      user.demands.create(crop: crop)
    end

    it "should return correct count of users' demands for respective crop" do
      expect(crop.number_demanded([user])).to eq 1
    end
  end
end
