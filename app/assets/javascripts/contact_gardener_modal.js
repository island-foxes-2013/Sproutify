function View() {
}

View.prototype.buildElement = function() {
  this.element = $(HandlebarsTemplates[this.template]
}


function ContactGardenerModal(recipient_id) {
  this.locator = '#contact-gardener-form';
  this.template = 'email_form'
  this.buildElement();
  Avgrund.show(this.locator);
  var self = this;
  this.element.find('form').on('submit', function(event) {
    event.preventDefault();
    var title = self.element.find('.title').val();
    var content = self.element.find('.message').val();
    self.emailUser(recipient_id, title, content);
  });
}

$.extend(ContactGardenerModal.prototype, View.prototype);
ContactGardenerModal.prototype.emailUser = function(id, title, content) {
  var data = {id: id, title: title, content: content};
  $.ajax({
    url: '/connect',
    type: 'get',
    data: data
  }).done(function(response){
    $('#connect-with-user').html(response.recipient.first_name + ' has been messaged!').fadeOut(2000);
  });
}

