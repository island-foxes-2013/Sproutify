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

  $(this).on('sent', this.sentMessage);
}

ContactGardenerModal.prototype.generateEmailForm = function() {
  this.modal = $(HandlebarsTemplates['email_form']());
}

ContactGardenerModal.prototype.show = function() {
  Avgrund.show('#contact-gardener-form-initial');
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
    // $('#contact-gardener-form-initial').html(HandlebarsTemplates['sent_message']());
    $(this).trigger('sent');
  }.bind(this));
}

ContactGardenerModal.prototype.sentMessage = function() {
  Avgrund.hide();
  Avgrund.show('#sent-confirmation');
}
