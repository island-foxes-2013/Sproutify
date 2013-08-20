describe("Geocoder", function(){
  var geocoder;

  google = function(){}
  google.maps = function(){}
  google.maps.Geocoder = function(){}
  google.maps.Geocoder.prototype.geocode = function(argument){
    geocoder.users_location = {lat: 30, lng: 100}
  }

  beforeEach(function() {
    geocoder = new Geocoder();
  });

  // NEED TO STUB GOOGLE MAP
  it("should be an instance of google maps Geocoder", function(){
    expect(geocoder instanceof Geocoder).toBeTruthy();
  });

  it("should have a default location of 'something'", function(){
    expect(geocoder.users_location).toEqual("something");
  });

  describe("#fetch", function(){
    it("should set user's location", function(){
      geocoder.fetch();
      expect(geocoder.users_location).toEqual({lat:30, lng:100});
    });
  });
});