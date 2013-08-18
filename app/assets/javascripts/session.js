function SessionManager(data){
  new Session(data);
  new SessionView();
  this.bindEvents();
}

function Session(data){
  this.logged_in = data.logged_in
}

function SessionView(){
  
}

SessionManager.prototype = {
  signup: function(response){
    if (response.success === true){
      // hide modal
      $("#signup-modal").modal('hide');

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
    this.bindSignupEvents();
    this.bindLoginEvents();
    this.bindLogoutEvents();
  },
  bindSignupEvents: function(){
    var self = this;
    $("body").on("ajax:beforeSend", ".signup-link", function(){
      $("#signup-modal").modal();
      return false;
    });
    $("body").on('hidden.bs.modal', "#signup-modal",  function(){
      $(this).find('.alert').remove();
    });
    $("body").on("ajax:beforeSend", "#new_user", function(event, xhr, settings) {
      settings.data += "&lat="+$('#hidden_lat').val();
      settings.data += "&lng="+$('#hidden_lng').val();
    });
    $("body").on("ajax:success", "#new_user", function(event, response, xhr, element){
      self.signup(response);
    });
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