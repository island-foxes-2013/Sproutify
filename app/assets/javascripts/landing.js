////////////////////
// LANDING MANAGER
function LandingManager() {
  $("#main-body").html(HandlebarsTemplates['landing']());

  $('body').on('click', '#submit', function(event) {
    event.preventDefault();
    var geocoder = new Geocoder();
    geocoder.fetch(getLocation(), function(location) {
      clearResults();
      getLocalInfo(location, function() {
        $('.signup-link').fadeIn(4000);
      });
    });
  });

}

function clearResults() {
  $('.user_count h3').remove();
  $('.user_count h4').remove();
  $('.available p').remove();
  $('.demanded p').remove();
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
    $('.user_count').append("<h3>There are "+ result.user_count +" gardeners near you!</h3>")
    $('.user_count').hide().fadeIn();
    if (result.user_count !== 0) {
      $('.user_count').append("<h4>In your area,</h4>").hide().fadeIn();

      for (var i = 0; i < result.crops_available.length; i++) {
        $('.available').append("<p>"+ result.crops_available[i].count+ " people have " + result.crops_available[i].name.toLowerCase() +" available!</p>").hide().fadeIn();
      }

      for (var i = 0; i< result.crops_demanded.length; i++) {
        $('.demanded').append("<p>"+ result.crops_demanded[i].count+ " people want " + result.crops_demanded[i].name.toLowerCase() + "!</p>").hide().fadeIn();
      }
    }
    callBack();
  });
}
