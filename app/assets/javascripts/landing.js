////////////////////
// LANDING MANAGER
function LandingManager() {

  $('#submit').on('click', function(event) {
    event.preventDefault();
    var geocoder = new Geocoder();
    geocoder.fetch(getLocation(), function(location) {
      clearResults();
      getLocalInfo(location, function() {
        $('.signup-link').fadeIn();
      });
    });
  });

}

function clearResults() {
  $('.container h3').remove();
  $('.container ul').remove();
}

function getLocation(){
  return $("#address").val() +', '+ $("#zip").val();
}

function setLocationFromPlugin(){
  $('#location').val(geoplugin_city());
}

function getLocalInfo(location, callBack) {
  $.ajax({
    url: "/fetch",
    type: "get",
    data: { lat: location.lat, lng: location.lng}
  }).done(function(result) {
    $('#hidden_lat').attr("value", location.lat);
    $('#hidden_lng').attr("value", location.lng);
    $('.container').append("<h3>There are "+ result.user_count +" gardeners in your area!</h3>")
    $('.container h3').hide().fadeIn();
    if (result.user_count !== 0) {
      $('.container').append("<ul>In your area,</ul>")

      for (var i = 0; i < 5; i++) {
        $('.container ul').append("<li>"+ result.crops_available[i].count+ " people have " + result.crops_available[i].name.toLowerCase() +" available!</li>").hide().fadeIn();
      }

      for (var i = 0; i< 5; i++) {
        $('.container ul').append("<li>"+ result.crops_demanded[i].count+ " people want " + result.crops_demanded[i].name.toLowerCase() + "!</li>").hide().fadeIn();
      }
    }
    callBack();
  });
}

function bindEvents(){
  $(".signup-link").on("ajax:beforeSend", function(event, xhr, settings){
    $("#signup-modal").modal();
    return false;
  });

  $("#new_user").on("ajax:beforeSend", function(event, xhr, settings) {
    settings.data += "&lat="+$('#hidden_lat').val();
    settings.data += "&lng="+$('#hidden_lng').val();
  });

  $("#new_user").on("ajax:success", function(event, response, xhr, element){
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
        $("#main-body").empty().append(response.pageElem);
      }); 
    }
  });

  $("#signup-modal").on('hidden.bs.modal', function(){
    $(this).find('.alert').remove();
  });

  $(".login-link").on("ajax:beforeSend", function(){
    $("#login-modal").modal();
    return false;
  });
  $("#new_session").on("ajax:success", function(event, response, xhr, element){
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
        $(".navbar-right").empty();
      });
    }
  });

  $("#login-modal").on('hidden.bs.modal', function(){
    $(this).find('.alert').remove();
  });

};

