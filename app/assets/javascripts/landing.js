//////////
// MARKER
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

////////////////
//GARDENERCODER
function GardenerCoder(lat, lng) {
  var lat = lat;
  var lng = lng;
  var self = this;
  var matches = [];

  function initialize(lat, lng) {
    self.fetch(lat, lng);
  }
  initialize(lat, lng);
}

GardenerCoder.prototype = {
  fetch: function(lat, lng) {
    //Some code that turns lat, lng into sunspot-accepting data
    $.ajax({
      url: '/fetch',
      type: 'get'
    }).done(function(response) {
      console.log(response);
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
        var gardenerCoder = new GardenerCoder(lat, lng);
      }
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

///////////////////
// DOCUMENT READY
$(function() {
  $('#location').val(geoplugin_city());
  var landingManager = new LandingManager();
});
