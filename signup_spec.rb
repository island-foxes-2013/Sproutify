require 'spec_helper'

describe "Sign up" do

  context "from the landing page" do
    # before do
    #   visit root_url
    # end

    # subject { page }

    it "has a Signup link"

    context "after clicking the signup link" do

      it "user stays on the landing page"

      it "has a field for first name"

      it "has a field for last name"

      it "has a field for username"

      it "has a field for password"

      context "if proper signup information provided" do

        it "redirects to main page"

      end

      context "if an invalid email is submitted" do

        it "user stays on the landing page"

        it "user fields stay filled in"

        it "user is shown 'invalid email' error"

      end

      context "if email is left blank" do

        it "user stays on the landing page"

        it "user fields stay filled in"

        it "user is shown 'email blank' error"

      end

      context "if username is left blank" do

        it "user stays on the landing page"

        it "user fields stay filled in"

        it "user is shown 'username blank' error"

      end

      context "if password is left blank" do

        it "user stays on the landing page"

        it "user fields stay filled in"

        it "user is shown 'password blank' error"

      end

    end

  end

end
