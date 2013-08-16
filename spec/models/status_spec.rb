require 'spec_helper'

describe Status do
  
  it {should respond_to(:name)}
  it {should respond_to(:supplies)}

  let(:status) { FactoryGirl.build(:status) }

  describe "#initialize" do

    context "valid data" do
      it "should save to database" do
        status.save.should eq true
      end
    end

    context "invalid data" do
      it "should not save to database" do
        status = Status.new
        status.save.should eq false
      end
    end
  end
end
