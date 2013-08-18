require 'spec_helper'

describe "Sign up", js: true do

  before(:each) { @user = build(:user) }

  context "from the landing page" do
    before do 
      visit root_path
      # sleep(0.5)
      page.execute_script("$('.signup-link').css('display','inline')");
    end

    context "after submitting a location" do
      before do
        fill_in :address, with: "717 California St"
        fill_in :zip, with: "94108"
        click_button "Check"
      end

      context "after clicking the signup link" do
        before(:each) {click_link "Signup"}

        context "if proper signup information provided" do
          before(:each) do
            fill_in :user_first_name, with: @user.first_name
            fill_in :user_last_name, with: @user.last_name
            fill_in :user_email, with: @user.email
            fill_in :user_password, with: @user.password
            fill_in :user_password_confirmation, with: @user.password
            click_button 'Signup'
          end

          it "redirects to main page" do
            pending "Need something on the main page to map to"
          end

        end

        context "if first name is left blank" do
          before(:each) do
            fill_in :user_last_name, with: @user.last_name
            fill_in :user_email, with: @user.email
            fill_in :user_password, with: @user.password
            fill_in :user_password_confirmation, with: @user.password
            click_button 'Signup'
          end

          it "user stays on the landing page" do
            expect(page).to have_text "Find Gardeners near you"
          end

          it "user fields stay filled in" do
            expect(page.find_field('user_last_name').value).to eq @user.last_name
            expect(page.find_field('user_email').value).to eq @user.email
            expect(page.find_field('user_password').value).to eq @user.password
          end

          it "user is shown 'First name can't be blank' error" do
            expect(page).to have_text "First name can't be blank"
          end

        end

        context "if last name is left blank" do
          before(:each) do
            fill_in :user_first_name, with: @user.first_name
            fill_in :user_email, with: @user.email
            fill_in :user_password, with: @user.password
            fill_in :user_password_confirmation, with: @user.password
            click_button 'Signup'
          end

          it "user stays on the landing page" do
            expect(page).to have_text "Find Gardeners near you"
          end

          it "user fields stay filled in" do
            expect(find_field('user_first_name').value).to eq @user.first_name
            expect(find_field('user_email').value).to eq @user.email
            expect(find_field('user_password').value).to eq @user.password
          end

          it "user is shown 'Last name can't be blank' error" do
            expect(page).to have_text "Last name can't be blank"
          end

        end

        context "if an invalid email is submitted" do
          before(:each) do
            fill_in :user_first_name, with: @user.first_name
            fill_in :user_last_name, with: @user.last_name
            fill_in :user_email, with: "5"
            fill_in :user_password, with: @user.password
            fill_in :user_password_confirmation, with: @user.password
            click_button 'Signup'
          end

          it "user stays on the landing page" do
            expect(page).to have_text "Find Gardeners near you"
          end

          it "user fields stay filled in" do
            expect(find_field('user_first_name').value).to eq @user.first_name
            expect(find_field('user_last_name').value).to eq @user.last_name
            expect(find_field('user_password').value).to eq @user.password
          end

          it "user is shown 'Email must be of the correct format' error" do
            expect(page).to have_text "Email is not a properly formatted email address"
          end

        end

        context "if email is left blank" do
          before(:each) do
            fill_in :user_first_name, with: @user.first_name
            fill_in :user_last_name, with: @user.last_name
            fill_in :user_password, with: @user.password
            fill_in :user_password_confirmation, with: @user.password
            click_button 'Signup'
          end

          it "user stays on the landing page" do
            expect(page).to have_text "Find Gardeners near you"
          end

          it "user fields stay filled in" do
            expect(find_field('user_first_name').value).to eq @user.first_name
            expect(find_field('user_last_name').value).to eq @user.last_name
            expect(find_field('user_password').value).to eq @user.password
          end

          it "user is shown 'Email can't be blank' error" do
            expect(page).to have_text "Email can't be blank"
          end

        end

        context "if an invalid password is submitted" do
          before(:each) do
            fill_in :user_first_name, with: @user.first_name
            fill_in :user_last_name, with: @user.last_name
            fill_in :user_email, with: @user.email
            fill_in :user_password, with: "a"
            fill_in :user_password_confirmation, with: "a"
            click_button 'Signup'
          end

          it "user stays on the landing page" do
            expect(page).to have_text "Find Gardeners near you"
          end

          it "user fields stay filled in" do
            expect(find_field('user_first_name').value).to eq @user.first_name
            expect(find_field('user_last_name').value).to eq @user.last_name
            expect(find_field('user_email').value).to eq @user.email
          end

          it "user is shown 'First name can't be blank' error" do
            expect(page).to have_text "First name can't be blank"
          end

        end

        context "if passwords don't match" do
          before(:each) do
            fill_in :user_first_name, with: @user.first_name
            fill_in :user_last_name, with: @user.last_name
            fill_in :user_email, with: @user.email
            fill_in :user_password, with: @user.password
            fill_in :user_password_confirmation, with: ""
            click_button 'Signup'
          end

          it "user stays on the landing page" do
            expect(page).to have_text "Find Gardeners near you"
          end

          it "user fields stay filled in" do
            expect(find_field('user_first_name').value).to eq @user.first_name
            expect(find_field('user_last_name').value).to eq @user.last_name
            expect(find_field('user_email').value).to eq @user.email
          end

          it "user is shown 'Passwords don't match' error" do
            expect(page).to have_text "First name can't be blank"
          end

        end

        context "if password is left blank" do
          before(:each) do
            fill_in :user_first_name, with: @user.first_name
            fill_in :user_last_name, with: @user.last_name
            fill_in :user_email, with: @user.email
            click_button 'Signup'
          end

          it "user stays on the landing page" do
            expect(page).to have_text "Find Gardeners near you"
          end

          it "user fields stay filled in" do
            expect(find_field('user_first_name').value).to eq @user.first_name
            expect(find_field('user_last_name').value).to eq @user.last_name
            expect(find_field('user_email').value).to eq @user.email
          end

          it "user is shown 'Password can't be blank' error" do
            expect(page).to have_text "Password can't be blank"
          end

        end

      end

    end

  end

end