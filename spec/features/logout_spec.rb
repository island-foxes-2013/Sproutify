require 'spec_helper'

feature 'Logout', js: true do
  before(:all) { @user = create(:user) }

  context "from the landing page" do
    before(:each) {visit root_path}

    it "has a login link" do
      expect(page).to have_link "Login"
    end

    context "after clicking the login link" do
      before(:each) {click_link "Login"}


      context "after visitor logs in correctly" do
        before(:each) do
          fill_in :session_email, with: @user.email
          fill_in :session_password, with: @user.password
          click_button 'Login'
        end

        context "after clicking logout link" do
          before(:each) {click_link "Logout"}

          it "should show the landing page" do
            expect(page).to have_text "Find Gardeners near you"
          end

          context "after visiting root path" do
            before(:each) {visit root_path}

            it "should show the landing page" do
              expect(page).to have_text "Find Gardeners near you"
            end
          end

        end

      end

    end

  end

end
