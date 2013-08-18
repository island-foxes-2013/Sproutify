// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require handlebars.runtime
//= require_tree .
//= require_tree ./templates


///////////////////
// DOCUMENT READY
$(function() {
  // setLocationFromPlugin();

  new LandingManager();
  // session = new SessionManager();
  // session.bindAll();

  // $("#testing").on("ajax:success", function(event, data, status, xhr) {
  //   console.log(data)
  //   $("#test").html(HandlebarsTemplates['home'](data));
  // });

  // Begin handlebars
  $.get('/sessions').done(function(data){
    $("body").html(HandlebarsTemplates['static']());
    if (data.logged_in){
      $(".navbar-right").html(HandlebarsTemplates['nav_loggedin'](data));
      $("#main-body").html(HandlebarsTemplates['main']());
    } else {
      $(".navbar-right").html(HandlebarsTemplates['nav_loggedout']());
      $("#main-body").html(HandlebarsTemplates['landing']());
    }
    $("body").trigger("initialLoadDone");
  });

  session = new SessionManager();
  
  $("body").on("initialLoadDone", function(){
    session.bindEvents();
  });
  
});

function SessionManager(){}

SessionManager.prototype = {
  signup: function(response){
    if (response.success === true){
      // hide modal
      $("#signup-modal").modal('hide');

      // after modal hidden, render handlebar templates
      $("#signup-modal").on('hidden.bs.modal', function(){
        $("#main-body").html(HandlebarsTemplates['main']());
        $(".navbar-right").html(HandlebarsTemplates['nav_loggedin'](response));
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

      // after modal hidden, render handlebar templates
      $("#login-modal").on('hidden.bs.modal', function(){
        $("#main-body").html(HandlebarsTemplates['main']());
        $(".navbar-right").html(HandlebarsTemplates['nav_loggedin'](response));
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


