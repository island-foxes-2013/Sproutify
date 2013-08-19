(function() {
  ////////////////////
  // LANDING MANAGER
  function LandingManager() {
    $("#main-body").html(HandlebarsTemplates['landing']());
    bindEvents();
  }

  function bindEvents() {
    $('body').on('click', '#submit', function(event) {
      event.preventDefault();
      var geocoder = new Geocoder();
      geocoder.fetch(getLocation(), function(location) {
        clearResults();
        getLocalInfo(location);
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

  function getLocalInfo(location) {
    var locationFetcher = new LocationFetcher();
    locationFetcher.fetch(location, function(localData) {
      $('#hidden_lat').attr("value", location.lat);
      $('#hidden_lng').attr("value", location.lng);
      $('#hook').html(HandlebarsTemplates['hook'](localData));
    });
  }

  window.LandingManager = LandingManager;
})();


function LocationFetcher() {
}


LocationFetcher.prototype.fetch = function(location, callback){
  $.ajax({
    url: "/fetch",
    type: "get",
    data: { lat: location.lat, lng: location.lng}
  }).done(function(data){
    callback(data);
  });
};
