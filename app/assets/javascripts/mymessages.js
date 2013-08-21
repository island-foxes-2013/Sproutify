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
    self.show(response);
  });
}

Message.prototype.show = function(message) {
  var sender = message.message[0].sender.first_name + " " + message.message[0].sender.last_name;
  var subject = message.message[0].message.subject;
  var body = message.message[0].message.body;
  console.log(message)
  // Avgrund.show(location);
}
