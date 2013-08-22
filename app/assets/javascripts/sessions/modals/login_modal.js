function LoginModal(session) {
  this.session = session;
  this.template = 'login_modal';
  this.field_prefix = "#session_";
  this.submitMethod = function(data) {
    return session.logIn(data);
  }

  this.render();
  this.bindEvents();

  var self = this;
  $(this.session).on('loggedIn', function() {
    self.close();
  });
}

LoginModal.prototype = Object.create(Modal.prototype);
