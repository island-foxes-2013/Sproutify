require 'spec_helper'

describe User do
  it {should respond_to(:first_name)}
  it {should respond_to(:last_name)}
  it {should respond_to(:email)}
  it {should respond_to(:password_digest)}
  it {should respond_to(:password)}
  it {should have_one(:geocode)}

  let(:user) {User.new(first_name: "Chuck", last_name: "Norris", email: "chuck@texas.com", password: "ilovebeards")}
  let(:baduser) {User.new}

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
end
