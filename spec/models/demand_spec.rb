require 'spec_helper'

describe Demand do

  it {should respond_to(:user)}
  it {should respond_to(:crop)}

  let(:user) { FactoryGirl.create(:user) }
  let(:crop) { FactoryGirl.create(:crop) }
  let(:demand) { FactoryGirl.build(:demand) }
  let(:demand2) { FactoryGirl.build(:demand) }

  describe "#initialize" do

    context "valid data" do
      it "should save to database" do
        demand.user = user
        demand.crop = crop
        demand.save.should eq true
      end
    end

    context "invalid data" do
      it "should not save to the database" do
        demand.save.should eq false
      end

      it "should not allow duplicate entries" do
        demand.user = user
        demand.crop = crop
        demand.save
        demand2.user = user
        demand2.crop = crop
        demand2.save.should eq false
      end
    end
  end
end
