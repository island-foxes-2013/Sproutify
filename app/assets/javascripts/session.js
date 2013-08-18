function SessionManager(data){
  mySession = new Session(data);
  new SessionView(mySession);
}

function Session(data){
  this.logged_in = data.logged_in;
  this.user = data.user;
}

function SignupView(){
  this.bindEvents();
  this.linkSelector = ".signup-link";
  this.formSelector = "#new_user"
  this.modalSelector = "signup-modal";
  this.$parent = $("body");
  this.$modal = $(this.modalSelector);
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
    this.$parent.on('hidden.bs.modal', this.modalSelector,  function(){
      this.$modal.find('.alert').remove();
    });

    // Before sending signup info
    this.$parent.on("ajax:beforeSend", this.formSelector, function(event, xhr, settings) {
      settings.data += "&lat="+$('#hidden_lat').val();
      settings.data += "&lng="+$('#hidden_lng').val();
    });

    // After signup info sent
    this.$parent.on("ajax:success", this.formSelector, function(event, response, xhr, element){
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
    if (response.success === true){
      // hide modal
      this.hideModal();

      // after modal hidden, go to MainManager
      $("#signup-modal").on('hidden.bs.modal', function(){
        $("#main-body").empty();
        $(".navbar-right").html(HandlebarsTemplates['nav_loggedin'](response));
        new MainManager();
      }); 
    } else {

      // empty fields where there is an error
      for (error_field in response.errors){
        $("#new_user").find("#user_"+error_field).val("");
        if(error_field === "password"){
          $("#new_user").find("#user_password_confirmation").val("");
        }
      }

      // show alert message
      $("#new_user").find('.alert').remove();
      $("#new_user").find(".modal-body").prepend(HandlebarsTemplates['error'](response));
    }
  },
}

function SessionView(session){
  this.session = session;
  this.bindEvents();
}

SessionView.prototype = {
  
  login: function(response){
    if (response.success === true){
      // hide modal
      $("#login-modal").modal('hide');

      // after modal hidden, go to MainManager
      $("#login-modal").on('hidden.bs.modal', function(){
        $("#main-body").empty();
        $(".navbar-right").html(HandlebarsTemplates['nav_loggedin'](response));
        new MainManager();
      }); 
    } else {
      // empty fields where there is an error
      for (error_field in response.errors){
        $("#new_session").find("#session_"+error_field).val("");
      }
      // show alert message
      $("#new_session").find('.alert').remove();
      $("#new_session").find(".modal-body").prepend(HandlebarsTemplates['error'](response));
    } 
    
  },
  logout: function(response){
    // render handlebar templates
    if (response.success === true){
      $("#main-body").html(HandlebarsTemplates['landing']());
      $(".navbar-right").html(HandlebarsTemplates['nav_loggedout']());
    }
  },
  bindEvents: function(){
    this.bindLoginEvents();
    this.bindLogoutEvents();
  },
  bindLoginEvents: function(){
    var self = this;
    $("body").on("ajax:beforeSend", ".login-link", function(){
      $("#login-modal").modal();
      return false;
    });
    $("body").on('hidden.bs.modal', "#login-modal", function(){
      $(this).find('.alert').remove();
    });
    $("body").on("ajax:success", "#new_session", function(event, response, xhr, element){
      self.login(response);
    });
  },
  bindLogoutEvents: function(){
    var self = this;
    $("body").on("ajax:success", ".logout-link", function(event, response, xhr, element){
      self.logout(response);
    });
  }
};