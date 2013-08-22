function AuthenticationView(options) {
  ["session", "link", "modal", "element"].forEach(function(option) {
    if (options[option] === undefined) {
      throw option + " is a required argument";    
    }
  });

  this.modal = new options.modal(options.session);

  var self = this;

  options.element.on('click', options.link, function() {
    options.element.append(self.modal.element);
    self.modal.show();
    return false;
  });
}