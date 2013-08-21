class UsersController < ApplicationController
  skip_before_filter :require_login

  def create
    @user = User.new(params[:user])
    @user.save
    if @user.errors.any?
      render json: {
        success: false,
        logged_in: false,
        errors: @user.errors
      }
    else
      self.current_user = @user
      @user.create_geocode(lat: params[:lat].to_f,
                           lng: params[:lng].to_f)
      render json:{
        success: true,
        user: @user,
        logged_in: true,
        current_user: current_user
      }
    end
  end

  def inbox
    inbox = current_user.mailbox.inbox
    render json: {inbox: inbox}
  end

  def message
    messages = []
    receipts = Conversation.find_by_id(params[:message_id]).receipts_for current_user
    receipts.each do |receipt|
      conversation = {}
      conversation[:sender] = receipt.message.sender
      conversation[:message] = receipt.message
      conversation[:receipt_id] = receipt.id
      messages << conversation
    end

    render json: {message: messages}
  end

  def email_user
    recipient = User.find_by_id(params[:id])
    current_user.send_message(recipient, params[:content], params[:title])
    render json: {recipient: recipient}
  end

  def respond_to_user
    receipt = Receipt.find_by_id(params[:receipt_id].to_i)
    # current_user.reply_to_sender(receipt, params[:body])
    # render :nothing => true, :status => 200
  end
end
