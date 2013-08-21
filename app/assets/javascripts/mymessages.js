function Inbox() {
  this.retrieve();
}

Inbox.prototype.show = function() {
  Avgrund.show('#user-inbox');
}

Inbox.prototype.retrieve = function() {
  var self = this;
  $.ajax({
    url: '/inbox',
    type: 'get'
  }).done(function(response){
    $('#message-list').append($(HandlebarsTemplates['inbox'](response)));
  });
}

function Message(message_id) {
  this.id = message_id;
  this.retrieve(this.id);
  $(this).on('retrieved', this.render);
  $(this).on('rendered', this.listen);
  $(this).on('reply', this.reply);
}

Message.prototype.retrieve = function (message_id) {
  var self = this;
  $.ajax({
    url: '/message',
    type: 'get',
    data: {message_id: message_id}
  }).done(function(response){
    self.set(response);
    $(self).trigger('retrieved');
  });
}

Message.prototype.set = function(data) {
  this.receipt_id        = data.message[0].receipt_id
  this.sender_id         = data.message[0].sender.id
  this.sender_first_name = data.message[0].sender.first_name;
  this.sender_last_name  = data.message[0].sender.last_name;
  this.sender_name       = this.sender_first_name + " " + this.sender_last_name;
  this.message_id        = data.message[0].message.id;
  this.subject           = data.message[0].message.subject;
  this.body              = data.message[0].message.body;
}

Message.prototype.render = function() {
  $('#main-body').append(HandlebarsTemplates['message'](this));
  this.modal = $(HandlebarsTemplates['message'](this));
  Avgrund.show('#message-'+ this.id);
  $(this).trigger('rendered');
}

Message.prototype.listen = function() {
  $('#message-'+ this.id).on('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var content = $(event.target).find('.message-email-body').val();
    var replyData = {receipt_id: this.receipt_id, body: content, message_id: this.id};
    $(this).trigger('reply', replyData);
  }.bind(this));
}

Message.prototype.reply = function(ev, replyData) {
  $.ajax({
    url: '/respond',
    type: 'post',
    data: replyData
  }).done(function(response) {
    console.log(response);
  });
}
