function bindEvents(){
  $("#signup-link").on("ajax:beforeSend", function(){
    console.log("hello world");
    $("#signup-modal").modal();
    return false;
  });
  $("#login-link").on("ajax:beforeSend", function(){
    $("#login-modal").modal();
    return false;
  });
  $("#new_session").on("ajax:success", function(event, response, xhr, element){
    if (response.hasOwnProperty("error")){
      var $alert = $(".alert-danger");
      $alert = $alert.text(response.error);
      $("#new_session").find(".modal-body").append($alert);
      $alert.show();
    }
    
  });

};

function Marker(map, lat, lng) {
  var self = this;
  var latLng = new google.maps.LatLng(lat,lng);
  var map = map;

  function initialize(map, latLng) {
    self.placeMarker(map, latLng);
  }
  initialize(map, latLng);
}

Marker.prototype = {
  placeMarker: function(map, latLng) {
    var map = map;
    var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        title: "Dev Bootcamp"
    });
  }
}

////////////////////
// LANDING MANAGER
function LandingManager() {
  $('#submit').on('click', function(event) {
    event.preventDefault();
    var user_location = $("#location").val();
    var geocoder_obj = new Geocoder(user_location);
  });
}

/////////////
// GEOCODER
function Geocoder(user_location) {
  var self = this;
  var geocoder = new google.maps.Geocoder();
  function initialize(geocoder, user_location) {
    self.fetch(geocoder, user_location);
  }
  initialize(geocoder, user_location);
}

Geocoder.prototype = {
  fetch: function(geocoder, user_location) {
    geocoder.geocode({'address': user_location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        var map = new Map(lat, lng);
      }
    });
  }
}

////////
// MAP
function Map(lat, lng) {
  var self = this;
  function initialize(lat, lng) {
    self.generate(lat, lng);
  }
  initialize(lat, lng);
}

Map.prototype = {
  generate: function(lat, lng) {
    var latLng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
      zoom: 12,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var info_window = new google.maps.InfoWindow({
      content: "placeholder"
    });
    var marker = new Marker(map, 37.794152, -122.406195);;
  }
}

///////////////////
// DOCUMENT READY
$(function() {
  // $('#location').val(geoplugin_city());
  // var landingManager = new LandingManager();
  bindEvents();
});
