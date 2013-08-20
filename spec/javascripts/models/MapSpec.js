describe("Map", function() {
  var map;
  var garden;

  var lat = 33.3;
  var lng = -111.1;

  beforeEach(function() {
    map = new Map(lat, lng);
    garden = new Garden({lat:30, lng:100});
  })

  it("should know its lat and lng", function() {
    expect(map.lat).toEqual(lat);
    expect(map.lng).toEqual(lng);
  });

  describe("#placeGarden", function() {
    it("should be able to place a garden", function() {
      map.placeGarden(garden);
      expect(map.gardens.set).toContain(garden);
    });
  });

  describe("#refreshGardens", function() {
    // todo - this calls a method that has an ajax call
  });

  describe("#clearGardens", function() {
    it("should remove all gardens in the garden set", function() {
      map.placeGarden(garden);
      map.clearGardens();
      expect(map.gardens.set).toNotContain(garden);
    });
  });
});