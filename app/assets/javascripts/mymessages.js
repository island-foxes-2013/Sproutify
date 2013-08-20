function Inbox() {
  this.retrieve();
}

Inbox.prototype.generate = function () {
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
    $('#main-body').append($(HandlebarsTemplates['inbox'](response)));
  });
}
