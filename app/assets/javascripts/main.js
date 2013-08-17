function Garden(gardenAttributes) {
  this.attrs = gardenAttributes;
  this.attrs.demandedCrops = gardenAttributes.demanded_crops.map(function(k, crop){
    return new Crop(crop);
  })
  this.attrs.suppliedCrops = gardenAttributes.demanded_crops.map(function(k, crop){
    return new Crop(crop);
  })
}

Garden.prototype.lat = function() {
  this.attrs.latitude
}

Garden.prototype.lng = function() {
  this.attrs.longitude
}

Garden.prototype.demandedCrops = function() {
  this.attrs.demandedCrops;
}

function Crop(cropAttributes) {
  this.attrs = cropAttributes;
}

//////////
// MARKER
function GardenMarker(map, garden) {
  this.map = map;
  this.garden = garden;
  this.place(map, garden.lat, garden.lng)
}

GardenMarker.prototype = {
  place: function(map, lat, lng) {
    var latLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        title: this.garden.title
    });
  }
}

////////////////
//GARDENERCODER
function GardenSearcher() {
}

GardenSearcher.prototype = {
  fetch: function(lat, lng, successCallback, failureCallback) {
    //Some code that turns lat, lng into sunspot-accepting data
    $.ajax({
      url: '/fetch',
      type: 'get'
    }).done(function(gardens) {
      gardens = $.map(gardens, function(k, garden){
        return new Garden(garden);
      });
      successCallback(gardens);
    });
  }
}


////////
// MAP
function Map(element, lat, lng) {
  this.element = element;
  this.lat = lat;
  this.lng = lng;
  this.markers = [];
  this.generate();
}

Map.prototype = {
  generate: function() {
    var latLng = new google.maps.LatLng(this.lat, this.lng);
    var mapOptions = {
      zoom: 12,
      center: latLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(element, mapOptions);
    this.info_window = new google.maps.InfoWindow({
      content: "placeholder"
    });
  }
  placeGarden: function(garden) {
    var gardenMarker = new GardenMarker(this.map, garden)
    this.markers.push(gardenMarker);
  }
}

/////////////
// GEOCODER
function Geocoder() {
  this.geocoder = new google.maps.Geocoder();
}

Geocoder.prototype = {
  fetch: function(user_location, successCallback, failureCallback) {
    this.geocoder.geocode({'address': user_location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        successCallback(lat, lng);
      } else {
        if (failureCallback) {
          failureCallback("Unable to find the given location");
        }
      }
    });
  }
}

////////////////////
// LANDING MANAGER
function LandingManager() {
  var map = new Map(document.getElementById('map-canvas'), 37, -120);
  var searcher = new GardenSearcher();

  map.onMove(function(lat, lng) {
    search(lat, lng);
  });

  $('#submit').on('click', function(event) {
    event.preventDefault();
    var geocoder = new Geocoder();
    geocoder.fetch(getLocation(), function(lat, lng) {
      map.setLocation(lat, lng);
    });
  });

  function search(lat, lng) {
    searcher.search(lat, lng, function(gardens) {
      $.each(gardens, function(garden) {
        map.placeGarden(garden)
      });
    });
  }
}

function getLocation(){
  return $("#location").val();
}

function setLocationFromPlugin(){
  $('#location').val(geoplugin_city());
}
