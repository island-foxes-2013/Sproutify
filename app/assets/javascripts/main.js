function Garden(gardenAttributes) {
  this.attrs = gardenAttributes;
  // this.attrs.demandedCrops = gardenAttributes.demanded_crops.map(function(k, crop){
  //   return new Crop(crop);
  // })
  // this.attrs.suppliedCrops = gardenAttributes.demanded_crops.map(function(k, crop){
  //   return new Crop(crop);
  // })
}

Garden.prototype.lat = function() {
  return this.attrs.lat;
}

Garden.prototype.lng = function() {
  return this.attrs.lng;
}

Garden.prototype.username = function() {
  return this.attrs.user.first_name +' '+ this.attrs.user.last_name;
}

// Garden.prototype.demandedCrops = function() {
//   this.attrs.demandedCrops;
// }

// function Crop(cropAttributes) {
//   this.attrs = cropAttributes;
// }

//////////
// MARKER
function GardenMarker(map, garden) {
  this.map = map;
  this.garden = garden;
  this.place(map, garden.lat(), garden.lng());
}

GardenMarker.prototype = {
  place: function(map, lat, lng) {
    var latLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        title: this.garden.username()
    });
  }
}

////////////////
//GARDENERCODER
function GardenSearcher() {
};

GardenSearcher.prototype = {
  fetch: function(lat, lng, successCallback, failureCallback) {
    console.log(lat);
    //Some code that turns lat, lng into sunspot-accepting data
    $.ajax({
      url: '/find_users',
      type: 'get',
      data: {lat: lat, lng: lng}
    }).done(function(gardens) {
      gardens = $.map(gardens, function(garden){
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
    this.map = new google.maps.Map(this.element, mapOptions);
    console.log('made it here');
    this.info_window = new google.maps.InfoWindow({
      content: "placeholder"
    });
  },
  placeGarden: function(garden) {
    var gardenMarker = new GardenMarker(this.map, garden)
    this.markers.push(gardenMarker);
  }
}

/////////////
// GEOCODER
function Geocoder() {
  this.geocoder = new google.maps.Geocoder();
  this.users_location = "something";
}

Geocoder.prototype.fetch = function(user_location, successCallback) {
  self = this;
  this.geocoder.geocode({'address': user_location}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      self.users_location = {lat: lat, lng: lng};
      successCallback(self.users_location);
    }
  });
}

// MAIN MANAGER
function MainManager() {
  self = this;
  var user_data = this.getUserData(function(user_data) {
    self.showMap();
    console.log(user_data);
    var map = new Map(document.getElementById('map-canvas'), user_data.user_lat, user_data.user_lng);
    var searcher = new GardenSearcher();
    var lat = user_data.user_lat;
    var lng = user_data.user_lng;
    searcher.fetch(lat, lng, function(gardens) {
      $.each(gardens, function(index) {
        map.placeGarden(gardens[index]);
      });
    });
  });
}

MainManager.prototype.getUserData = function(successCallback) {
  $.ajax({
    url: '/user_data',
    type: 'get'
  }).done(function(user_data) {
    successCallback(user_data);
  });
}

MainManager.prototype.showMap = function() {
  $('#main-body').append(HandlebarsTemplates['map']);
}
