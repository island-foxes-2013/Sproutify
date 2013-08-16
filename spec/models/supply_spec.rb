require 'spec_helper'

describe Supply do
  
  it {should respond_to(:user)}
  it {should respond_to(:crop)}
  it {should respond_to(:status)}

  let(:user) { FactoryGirl.create(:user) }
  let(:crop) { FactoryGirl.create(:crop) }
  let(:status) { FactoryGirl.create(:status) }
  let(:supply) { FactoryGirl.build(:supply) }
  let(:supply2) { FactoryGirl.build(:supply) }

  describe "#initialize" do

    context "valid data" do
      it "should save to the database" do
        supply.user = user
        supply.crop = crop
        supply.status = status
        supply.save.should eq true
      end
    end

    context "invalid data" do
      it "should not save to the database" do
        supply.save.should eq false
      end

      it "should not allow duplicate entries" do
        supply.user = user
        supply.crop = crop
        supply.status = status
        supply.save
        supply2.user = user
        supply2.crop = crop
        supply2.status = status
        supply2.save.should eq false
      end
    end
  end
end
