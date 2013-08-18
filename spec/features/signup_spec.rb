require 'spec_helper'

describe "Sign up", js: true do

  before(:all) { @user = build(:user) }

  context "from the landing page" do
    before do 
      visit root_path
      sleep(0.5)
      page.execute_script("$('.signup-link').css('display','inline')");
    end

    it "has a Signup link" do
      expect(page).to have_link "Signup"
    end

    context "after clicking the signup link" do
      before(:each) {click_link "Signup"}

      it "user stays on the landing page" do
        expect(current_path).to eq root_path
      end

      it "has a field for first name" do
        expect(page).to have_field "user_first_name"
      end

      it "has a field for last name" do
        expect(page).to have_field "user_last_name"
      end

      it "has a field for email" do
        expect(page).to have_field "user_email"
      end

      it "has a field for password" do
        expect(page).to have_field "user_password"
      end

      it "has a signup button" do
        expect(page).to have_button "Signup"
      end

      context "if proper signup information provided" do
        before(:each) do
          fill_in :user_first_name, with: @user.first_name
          fill_in :user_last_name, with: @user.last_name
          fill_in :user_email, with: @user.email
          fill_in :user_password, with: @user.password
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
          click_button 'Signup'
        end

        it "user stays on the landing page" do
          expect(page).to have_text "Find Gardeners near you"
        end

        it "user fields stay filled in" do
          expect(find_field('user_last_name').value).to eq @user.last_name
          expect(find_field('user_email').value).to eq @user.email
          expect(find_field('user_password').value).to eq @user.password
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
          expect(page).to have_text "Email must be of the correct format"
        end

      end

      context "if email is left blank" do
        before(:each) do
          fill_in :user_first_name, with: @user.first_name
          fill_in :user_last_name, with: @user.last_name
          fill_in :user_password, with: @user.password
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