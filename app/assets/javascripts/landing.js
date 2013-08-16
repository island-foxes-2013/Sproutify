$(function(){
  new Manager();
  bindEvents();
});

function Manager(){
  this.signupModal = new Modal({
    name: "signup",
    title: "Create An Account",
    body: $("\
      <input type='text' placeholder='first name'>\
      <input type='text' placeholder='last name'>\
      <input type='text' placeholder='email'>\
      <input type='text' placeholder='password'>\
      "),
    footer: $("\
      <button class='btn btn-primary'>Signup</button>\
      ")
  }),
  this.signupModalView = new ModalView(this.signupModal)


  this.initalize();
};

Manager.prototype = {
  initalize: function(){
    $signupModal = this.signupModalView.render()
    $("body").append($signupModal)
  }
  bindEvents: function(){
    $("a .signup").on("click", function(){
      $(callback)
    })
  }
};

function Modal(options){
  this.setOptions(options);
};

Modal.prototype = {
  setOptions: function(){
    if (options.hasOwnProperty("name")){
      this.name = options.name;
    } else {
      this.name = "default";
    }
    if (options.hasOwnProperty("title")){
      this.title = options.title;
    } else {
      this.title = "Default Title";
    }
    if (options.hasOwnProperty("body")){
      this.body = options.body;
    } else {
      this.body = "Default Body";
    }
    if (options.hasOwnProperty("footer")){
      this.footer = options.footer;
    } else {
      this.footer = [];
    }
  }
};

function ModalView(modal){
  this.modal = modal;
  this.getElem();
}

ModalView.prototype = {
  getElem: function(){
    var elem = $.trim($('#modal_template').html());
    this.$elem = $(elem).removeAttr('id');
  },
  render: function(){
    this.$elem.addClass(this.modal.name);
    this.$elem.find('.modal-title').append(this.modal.title);
    this.$elem.find('.modal-body').append(this.modal.body);
    this.$elem.find('.modal-footer').append(this.modal.footer);
    this.$elem.show();
    return this.$elem
  }
};