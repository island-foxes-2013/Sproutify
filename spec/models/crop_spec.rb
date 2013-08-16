require 'spec_helper'

describe Crop do
  
  it {should respond_to(:name)}

  let(:crop) {Crop.new}
  let(:crop2) {Crop.new}
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
end
