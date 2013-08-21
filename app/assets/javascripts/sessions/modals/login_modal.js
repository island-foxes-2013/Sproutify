function LoginModal(session) {
  this.template = 'login_modal';
  this.field_prefix = "#session_";
  this.submitMethod = function(data) {
    return session.logIn(data);
  }

  this.render();
  this.bindEvents();
}


LoginModal.prototype = Object.create(Modal.prototype);