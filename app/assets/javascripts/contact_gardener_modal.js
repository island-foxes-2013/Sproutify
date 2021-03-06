function ContactGardenerModal(user_id) {
  this.generateEmailForm();
  var self = this;
  this.modal.on('submit', function(event) {
    event.preventDefault();
    var title = self.modal.find('.title').val();
    var content = self.modal.find('.message').val();
    self.emailUser(user_id, title, content);
  });
  this.modal.on('click', '.close', function() {
    self.hide();
  });
}

ContactGardenerModal.prototype.generateEmailForm = function() {
  this.modal = $(HandlebarsTemplates['email_form']());
}

ContactGardenerModal.prototype.show = function(selector) {
  Avgrund.show(selector);
}

ContactGardenerModal.prototype.hide = function() {
  Avgrund.hide();
}

ContactGardenerModal.prototype.emailUser = function(id, title, content) {
  var data = {id: id, title: title, content: content};
  $.ajax({
    url: '/connect',
    type: 'post',
    data: data
  }).done(function(response){
    this.hide();
    this.show('#sent-confirmation');
  }.bind(this));
}
