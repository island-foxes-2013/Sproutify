require 'spec_helper'

describe "Sign up", js: true do

  context "from the landing page" do
    before(:each) do 
      visit root_path
      # sleep(0.5)
      page.execute_script("$('.signup-link').css('display','inline')");
    end

    context "after submitting a location" do
      before(:each) do
        fill_in :address, with: "717 California St"
        fill_in :zip, with: "94108"
        click_button "Check"
      end

      context "after clicking the signup link" do
        before(:each) {click_link "Signup"}

        context "for invalid signup" do

          before(:all) { @user = build(:user) }

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

            it "user is shown 'first name can't be blank' error" do
              expect(page).to have_text "first name can't be blank"
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

            it "user is shown 'last name can't be blank' error" do
              expect(page).to have_text "last name can't be blank"
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

            it "user is shown 'email is not a properly formatted email address' error" do
              expect(page).to have_text "5 is not a properly formatted email address"
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

            it "user is shown 'email can't be blank' error" do
              expect(page).to have_text "email can't be blank"
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

            it "user is shown 'password is too short' error" do
              expect(page).to have_text "password is too short"
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

            it "user is shown 'passwords don't match' error" do
              expect(page).to have_text "passwords don't match"
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

            it "user is shown 'password can't be blank' error" do
              expect(page).to have_text "password can't be blank"
            end

          end

        end

        context "if proper signup information provided" do
          before(:all) {@user = build(:user)}
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

      end

    end

  end

end