require 'spec_helper'

feature 'Login', js: true do
  before(:all) { @user = create(:user) }

  context "from the landing page" do
    before(:each) {visit root_path}

    context "after clicking the login link" do
      before(:each) {click_link "Login"}

      it "user stays on the landing page" do
        expect(current_path).to eq root_path
      end

      it "has a field for username" do
        expect(page).to have_field "session_email"
      end

      it "has a field for password" do
        expect(page).to have_field "session_password"
      end

      it "has a login button" do
        expect(page).to have_button "Login"
      end

      context "when visitor logs in correctly" do
        before(:each) do
          fill_in :session_email, with: @user.email
          fill_in :session_password, with: @user.password
          click_button 'Login'
        end
      
        it "user is shown the main page" do
          pending "Need something on the main page to map to"
        end

        context "after visiting root path" do
          before(:each) {visit root_path}

          it "should show the main page" do
            pending "Need something on main page to bind to"
          end
        end

      end

      context "when visitor logs in with unknown email" do
        before(:each) do
          fill_in :session_email, with: "hello"
          fill_in :session_password, with: @user.password
          click_button 'Login'
        end

        it "user is shown 'Email is unrecognized' error" do
          expect(page).to have_text "Email is unrecognized"
        end

        it "user stays on landing page" do
          expect(page).to have_text "Find Gardeners near you"
        end

      end

      context "when visitor logs in with invalid password" do
        before(:each) do
          fill_in :session_email, with: @user.email
          fill_in :session_password, with: "aaa"
          click_button 'Login'
        end

        it "user is shown 'Password is invalid' error" do
          expect(page).to have_text "Password is invalid"
        end

        it "user stays on landing page" do
          expect(page).to have_text "Find Gardeners near you"
        end

      end

    end

  end

end
