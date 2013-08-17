require 'spec_helper'

feature 'Login' do

  context "from the landing page" do

    it "has a login link"

    context "after clicking the login link" do

      it "user stays on the landing page"

      it "has a field for username"

      it "has a field for password"

      context "when visitor logs in correctly" do
      
        it "user is redirected to main page"

      end

      context "when visitor logs in with unknown email" do

        it "user is shown 'Can't find that email' error"

        it "user stays on landing page"

      end

      context "when visitor logs in with invalid password" do

        it "user is shown 'Invalid password' error"

        it "user statys on landing page"

      end

    end

  end

end
