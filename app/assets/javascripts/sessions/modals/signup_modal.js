function SignupModal(session) {
  this.template = 'signup_modal';
  this.field_prefix = "#user_";
  this.submitMethod = function(data) {
    return session.signUp(data)
  }
  this.render();
  this.bindEvents();
}
SignupModal.prototype = Object.create(Modal.prototype);

SignupModal.prototype.prepareData = function(data) {
  data += "&lat=" + $('#hidden_lat').val();
  data += "&lng=" + $('#hidden_lng').val();
  return data;
}

