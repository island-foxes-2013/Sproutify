function SessionManager(data){
  mySession = new Session(data);
  new SessionView(mySession);
}

function Session(data){
  this.logged_in = data.logged_in;
  this.user = data.user;
  this.errors = {};
}

function SessionView(session){
  this.session = session;

  this.attachModals();
  this.bindEvents();

  this.signupView = new SignupView(session);
  this.loginView = new LoginView(session);
  this.logoutView = new LogoutView(session);
}

SessionView.prototype = {
  attachModals: function(){
    if (this.session.logged_in !== true) {
      $("#main-body").append(HandlebarsTemplates['signup_modal']());
      $("#main-body").append(HandlebarsTemplates['login_modal']());
    }
  },
  bindEvents: function(){
    $("body").on("login", function(){
      $("#main-body").empty();
      $(".navbar-right").html(HandlebarsTemplates['nav_loggedin']());
      new MainManager();
    });
    $("body").on("logout", function(){
      $(".navbar-right").html(HandlebarsTemplates['nav_loggedout']());
      new LandingManager();
    });
  }

};

function SignupView(session){

  this.session = session;

  this.linkSelector = ".signup-link";
  this.formSelector = "#new_user";
  this.modalSelector = "#signup-modal";
  this.$parent = $("body");
  this.$modal = $(this.modalSelector);
  this.$form = $(this.formSelector);

  this.bindEvents();
}

SignupView.prototype = {
  bindEvents: function(){
    var self = this;

    // Clicking on signup link
    this.$parent.on("ajax:beforeSend", this.linkSelector, function(){
      self.showModal();
      return false;
    });

    // After modal is hidden
    // this.$parent.on('hidden.bs.modal', this.modalSelector,  function(){
    //   this.$modal.find('.alert').remove();
    // });

    // Before sending signup info
    this.$parent.on("ajax:beforeSend", this.formSelector, function(event, xhr, settings) {
      settings.data += "&lat="+$('#hidden_lat').val();
      settings.data += "&lng="+$('#hidden_lng').val();
    });

    // After signup info sent
    this.$parent.on("ajax:success", this.formSelector, function(event, response, xhr, element){
      self.session.logged_in = response.logged_in;
      self.session.user = response.user;
      self.session.errors = response.errors;
      self.signup(response);
    });
  },
  showModal: function(){
    this.$modal.modal();
  },
  hideModal: function(){
    this.$modal.modal('hide');
  },
  signup: function(response){
    if (this.session.logged_in === true){
      var self = this;
      this.hideModal();
      this.$modal.on('hidden.bs.modal', function(){ self.$parent.trigger("login") }); 
    } else {
      this.displayModalErrors(response); 
    }
  },
  displayModalErrors: function(response){
    // empty fields where there is an error
    for (error_field in response.errors){
      this.$form.find("#user_"+error_field).val("");
      if(error_field === "password"){
        this.$form.find("#user_password_confirmation").val("");
      }
    }

    // show alert message
    this.$form.find('.alert').remove();
    this.$form.find(".modal-body").prepend(HandlebarsTemplates['error'](response));

  }
}

function LoginView(session){
  this.session = session;

  this.linkSelector = ".login-link";
  this.formSelector = "#new_session";
  this.modalSelector = "#login-modal";
  this.$parent = $("body");
  this.$modal = $(this.modalSelector);
  this.$form = $(this.formSelector);

  this.bindEvents();
}

LoginView.prototype = {
  bindEvents: function(){
    var self = this;

    // Clicking on signup link
    this.$parent.on("ajax:beforeSend", this.linkSelector, function(){
      self.showModal();
      return false;
    });

    // After modal is hidden
    // this.$parent.on('hidden.bs.modal', this.modalSelector,  function(){
    //   this.$modal.find('.alert').remove();
    // });

    // After signup info sent
    this.$parent.on("ajax:success", this.formSelector, function(event, response, xhr, element){
      self.session.logged_in = response.logged_in;
      self.session.user = response.user;
      self.session.errors = response.errors;
      self.login(response);
    });
  },
  showModal: function(){
    this.$modal.modal();
  },
  hideModal: function(){
    this.$modal.modal('hide');
  },
  login: function(response){
    if (this.session.logged_in === true){
      var self = this;
      this.hideModal();
      this.$modal.on('hidden.bs.modal', function(){ self.$parent.trigger("login") });
    } else {
      this.displayModalErrors(response); 
    }
  },
  displayModalErrors: function(response){
    // empty fields where there is an error
    for (error_field in response.errors){
      this.$form.find("#session_"+error_field).val("");
    }

    // show alert message
    this.$form.find('.alert').remove();
    this.$form.find(".modal-body").prepend(HandlebarsTemplates['error'](response));

  }
};

function LogoutView(session){
  this.session = session;

  this.linkSelector = ".logout-link";
  this.$parent = $("body");

  this.bindEvents();
}

LogoutView.prototype = {
  bindEvents: function(){
    var self = this;
    this.$parent.on("ajax:success", this.linkSelector, function(event, response, xhr, element){
      self.session.logged_in = response.logged_in;
      self.$parent.trigger("logout");
    });
  }
};


// SessionView.prototype = {
//   logout: function(response){
//     // render handlebar templates
//     if (response.success === true){
//       $("#main-body").html(HandlebarsTemplates['landing']());
//       $(".navbar-right").html(HandlebarsTemplates['nav_loggedout']());
//     }
//   },
//   bindLogoutEvents: function(){
//     var self = this;
//     $("body").on("ajax:success", ".logout-link", function(event, response, xhr, element){
//       self.logout(response);
//     });
//   }
// };