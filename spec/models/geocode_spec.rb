require 'spec_helper'

describe Geocode do
  
  it{should respond_to(:lat)}
  it{should respond_to(:lng)}
  it{should respond_to(:user)}

  describe "#initialize" do

    context "valid data" do
      it "should save to database" do

      end
  end
end
