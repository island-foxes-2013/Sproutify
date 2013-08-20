describe("Garden", function() {
  var lat = 33.3;
  var lng = 111.1;
  var user_id = 1;
  var username = "first last";
  var email = 'test@test.com';
  var demands = [{name:'corn'}, {name:'potato'}];
  var supplies = [{name:'beet'}, {name:'bean'}];;

  beforeEach(function() {
    user = {id: user_id, first_name: 'first', last_name: 'last',
            email: email}
    attrs = {lat: lat, lng: lng, user: user,
             demands: demands, supplies: supplies};
    garden = new Garden(attrs);
  });

  it("should know its lat and lng", function() {
    expect(garden.lat()).toEqual(lat);
    expect(garden.lng()).toEqual(lng);
  });

  describe("#user_id", function() {
    it("should return the user id", function() {
      expect(garden.user_id()).toEqual(user_id);
    });
  });

  describe("#username", function() {
    it("should return the username", function() {
      expect(garden.username()).toEqual(username);
    });
  });

  describe("#email", function() {
    it("should return the email", function() {
      expect(garden.email()).toEqual(email);
    });
  });

  describe("#demandedCrops", function() {
    it("should return the demanded crops", function() {
      expect(garden.demandedCrops()).toEqual(demands);
    });
  });

  describe("#suppliedCrops", function() {
    it("should return the supplied crops", function() {
      expect(garden.suppliedCrops()).toEqual(supplies);
    });
  });

  describe("#getSupplyNames", function() {
    it("should return the names of crops in an array", function() {
      expect(garden.getSupplyNames()).toEqual(['beet', 'bean']);
    });
  });

  describe("#getDemandNames", function() {
    it("should return the names of crops in an array", function() {
      expect(garden.getDemandNames()).toEqual(['corn', 'potato']);
    });
  });
});