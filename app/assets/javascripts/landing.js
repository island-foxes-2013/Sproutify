////////////////////
// LANDING MANAGER
function LandingManager() {

  $('#submit').on('click', function(event) {
    event.preventDefault();
    var geocoder = new Geocoder();
    geocoder.fetch(getLocation(), function(location) {
      getLocalInfo(location);
    });
  });

}

function getLocation(){
  return $("#address").val() +', '+ $("#zip").val();
}

function setLocationFromPlugin(){
  $('#location').val(geoplugin_city());
}

function getLocalInfo(location) {
  $.ajax({
    url: "/fetch",
    type: "get",
    data: { lat: location.lat, lng: location.lng}
  }).done(function(result) {
    $('#hidden_lat').attr("value", location.lat);
    $('#hidden_lng').attr("value", location.lng);
    $('.container').append("<p>There are "+ result.count +" gardeners in your area!</p>")
    $('.container').append("<ul>These are some crops available in your area:</ul>")
    for (var i in result.crops_available) {
      $('.container ul').append("<li>"+ result.crops_available[i] +"</li>")
    }
    
  });
}

function SessionManager(){

}

SessionManager.prototype = {
  signup: function(response){
    if (response.hasOwnProperty("errors")){
      for (error_field in response.errors){
        $("#new_user").find("#user_"+error_field).val("");
        if(error_field === "password"){
          $("#new_user").find("#user_password_confirmation").val("");
        }
      }

      $("#new_user").find('.alert').remove();
      $("#new_user").find(".modal-body").prepend(response.errorElem);
    }
    if (response.hasOwnProperty("pageElem")){
      $("#signup-modal").modal('hide');
      $("#signup-modal").on('hidden.bs.modal', function(){
      $("#main-body").empty();
      $(".navbar-right").empty().append(response.navElem);
      new MainManager();
      }); 
    }
    this.bindLogoutEvents();
  },
  login: function(response){
    if (response.hasOwnProperty("errors")){
      for (error_field in response.errors){
        $("#new_session").find("#session_"+error_field).val("");
      }

      $("#new_session").find('.alert').remove();
      $("#new_session").find(".modal-body").prepend(response.errorElem);
    }
    if (response.hasOwnProperty("pageElem")){
      $("#login-modal").modal('hide');
      $("#login-modal").on('hidden.bs.modal', function(){
        $("#main-body").empty().append(response.pageElem);
        $(".navbar-right").empty().append(response.navElem);
      });    
    }

    this.bindLogoutEvents();
    
  },
  logout: function(response){
    if (response.status === true){
      if (response.hasOwnProperty("pageElem")){
        $("#main-body").empty().append(response.pageElem);
      }
      $(".navbar-right").empty().append(response.navElem);
    }
    this.bindSignupEvents();
    this.bindLoginEvents();
  },
  bindAll: function(){
    this.bindSignupEvents();
    this.bindLoginEvents();
    this.bindLogoutEvents();
  },
  bindSignupEvents: function(){
    var self = this;
    $(".signup-link").on("ajax:beforeSend", function(){
      $("#signup-modal").modal();
      return false;
    });
    $("#new_user").on("ajax:beforeSend", function(event, xhr, settings) {
      settings.data += "&lat="+$('#hidden_lat').val();
      settings.data += "&lng="+$('#hidden_lng').val();
    });
    $("#signup-modal").on('hidden.bs.modal', function(){
      $(this).find('.alert').remove();
    });
    $("#new_user").on("ajax:success", function(event, response, xhr, element){
      self.signup(response);
    });
  },
  bindLoginEvents: function(){
    var self = this;
    $(".login-link").on("ajax:beforeSend", function(){
      $("#login-modal").modal();
      return false;
    });
    $("#login-modal").on('hidden.bs.modal', function(){
      $(this).find('.alert').remove();
    });
    $("#new_session").on("ajax:success", function(event, response, xhr, element){
      self.login(response);
    });
  },
  bindLogoutEvents: function(){
    var self = this;
    $(".logout-link").on("ajax:success", function(event, response, xhr, element){
      self.logout(response);
    });
  }

};

