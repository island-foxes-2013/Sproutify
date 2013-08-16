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

function Geocoder(input) {
  var self = this;
  var geocoder = new google.maps.Geocoder();

  function initialize(geocoder, input) {
    self.fetch(geocoder, input);
  }
  initialize(geocoder, input);
}

Geocoder.prototype = {
  fetch: function(geocoder, input) {
    geocoder.geocode({'address': input}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        var map = new Map(lat, lng);
      }
    });
  }
}

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

function LandingManager() {
  $('#submit').on('click', function(event) {
    event.preventDefault();
    var input = $("#location").val();
    var geocoder_obj = new Geocoder(input);
  });
}

$(function() {
  var landingManager = new LandingManager();
});
