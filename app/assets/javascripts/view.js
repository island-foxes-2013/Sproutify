function View() {

}


View.prototype.render = function() {
  this.element = $(HandlebarsTemplates[this.template]());
}

function Modal(element) {
  this.element = element;  
}

Modal.prototype = Object.create(View.prototype);

Modal.prototype.bindEvents = function() {
  var self = this;
  this.element.on('click', '.close', function(e) {
    e.preventDefault();
    self.close();
  });

  this.element.on('submit', 'form', function(e) {
    e.preventDefault();
    self.submit();
  });
}

Modal.prototype.submit = function() {
  var data = this.prepareData($(this.element.find('form')).serialize());
  var self = this;
  this.submitMethod(data).done(function() {
    self.close();
  }).fail(function(model) {
    self.renderErrors(model.errors());
  });
}

Modal.prototype.prepareData = function(data) {
  return data;
};

Modal.prototype.show = function() {
  this.element.modal();
}

Modal.prototype.close = function() {
  this.element.modal('close'); 
}

Modal.prototype.renderErrors = function(errors) {
  console.log(errors);
  for (error_field in errors){
    this.element.find(this.field_prefix+error_field).val("");
    if(error_field === "password"){
      this.element.find("#user_password_confirmation").val("");
    }
  }

  // show alert message
  this.element.find('.alert').remove();

  this.element.find(".modal-body").prepend(HandlebarsTemplates['error']({ errors: errors }));
}
