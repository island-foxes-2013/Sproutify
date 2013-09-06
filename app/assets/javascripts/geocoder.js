/////////////
// GEOCODER
function Geocoder() {
  this.geocoder = new google.maps.Geocoder();
  this.users_location = "something";
}

Geocoder.prototype.fetch = function(user_location, successCallback) {
  var self = this;
  this.geocoder.geocode({'address': user_location}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      self.users_location = {lat: lat, lng: lng};
      successCallback(self.users_location);
    }
  });
}
