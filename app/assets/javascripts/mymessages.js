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
  this.retrieve(message_id);
}

Message.prototype.retrieve = function (message_id) {
  var self = this;
  $.ajax({
    url: '/message',
    type: 'get',
    data: {message_id: message_id}
  }).done(function(response){
    self.set(response);
  });
}

Message.prototype.set = function(message) {
  var sender_id = message.message[0].sender.id;
  var sender_name = message.message[0].sender.first_name + " " + message.message[0].sender.last_name;
  var message_id = message.message[0].message.id;
  var subject = message.message[0].message.subject;
  var body = message.message[0].message.body;
  var message = {sender_id: sender_id, sender_name: sender_name, message_id: message_id, subject: subject, body: body};
  $('#main-body').append(HandlebarsTemplates['message'](message));
  Avgrund.show('#message-'+ message_id);
}
