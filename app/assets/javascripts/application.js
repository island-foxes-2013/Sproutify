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

  // new LandingManager();
  // session = new SessionManager();
  // session.bindAll();

  // $("#testing").on("ajax:success", function(event, data, status, xhr) {
  //   console.log(data)
  //   $("#test").html(HandlebarsTemplates['home'](data));
  // });

  // Begin handlebars
  $.get('/sessions').done(function(data){
    $("body").html(HandlebarsTemplates['static'](data));
    $("body").trigger("initialLoadDone");
  });
  
  $("body").on("initialLoadDone", function(){
    $("body").on("ajax:beforeSend", ".signup-link", function(){
      $("#signup-modal").modal();
      return false;
    });

    $("body").on("ajax:beforeSend", ".login-link", function(){
      $("#login-modal").modal();
      return false;
    });
  });
  
});
