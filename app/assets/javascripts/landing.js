(function() {
  ////////////////////
  // LANDING MANAGER
  function LandingManager() {
    $("#main-body").html(HandlebarsTemplates['landing']());
    $("#landing #address").focus();
    bindEvents();
  }

  function bindEvents() {
    $('body').on('click', '#submit', function(event) {
      event.preventDefault();
      $("#local-info").slideUp(function(){
        var geocoder = new Geocoder();
        geocoder.fetch(getLocation(), function(location) {
          getLocalInfo(location);
        });
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
    var locationFetcher = new LocationFetcher();
    locationFetcher.fetch(location, function(localData) {
      $('#hidden_lat').attr("value", location.lat);
      $('#hidden_lng').attr("value", location.lng);
      $('#local-info').html(HandlebarsTemplates['hook'](localData));
      showResults();
    });
  }

  function showResults(){
    if ($('#local-form').css("margin-top") != "0px"){
      $("#local-form").animate({
        "margin-top": "0px"
      });
    }
    $("#local-info").slideDown();
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
