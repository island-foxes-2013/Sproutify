///////////////////
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
  return $("#location").val();
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
    $('.container').append("<p>There are "+ result.count +" gardeners in your area!</p>")
  });
}
