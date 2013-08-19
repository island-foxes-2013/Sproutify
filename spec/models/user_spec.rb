require 'spec_helper'

describe User do
  it {should validate_presence_of(:first_name)}
  it {should validate_presence_of(:last_name)}
  it {should validate_presence_of(:email)}
  it {should validate_presence_of(:password)}
  it {should validate_presence_of(:password_confirmation)}
  it {should validate_uniqueness_of(:email)}

  it { should ensure_length_of(:password).is_at_least(6).is_at_most(20) }
  it { should allow_value('michael@michael.com').for(:email)}
  it { should_not allow_value('test@test').for(:email)}
  it { should_not allow_value('test').for(:email)}
  it { should_not allow_value('@@.c').for(:email)}

  it {should respond_to(:first_name)}
  it {should respond_to(:last_name)}
  it {should respond_to(:email)}
  it {should respond_to(:password_digest)}
  it {should respond_to(:password)}
  it {should respond_to(:geocode)}

  it {should have_one(:geocode)}
  it {should have_many(:supplies)}
  it {should have_many(:demands)}

  let(:user) {build(:user)}
  let(:baduser) {User.new}
  let(:crop) { FactoryGirl.create(:crop) }

  describe "#initialize" do

    context "valid data" do
      it "should save to database" do
        user.save.should eq true
      end
    end

    context "invalid data" do
      it "should not save to database" do
        baduser.save.should eq false
      end
    end
  end

  describe "#growing" do
    let(:status) { FactoryGirl.create(:status)}

    before do
      user.save  
      user.supplies.create(crop: crop, status: status)
    end

    it "should return an array of user crops matching a status" do
      expect(user.growing.last).to eq crop
    end
  end

  describe "#harvesting" do
    let(:status) {create(:status, name: 'harvested')}

    before do
      user.save
      user.supplies.create(crop: crop, status: status)
    end

    it "should return an array of user crops with a status of 'harvested'" do
      expect(user.harvesting.last).to eq crop
    end
  end

  describe "#demanding" do
    let(:new_user) {create(:user)}
    let(:new_crop) {create(:crop)}
    
    before do
      new_user.demands.create(crop: new_crop)
    end

    it "should return the name of crops the user demands" do
      expect(new_user.demanding.last).to eq new_crop.name
    end
  end
end














