describe("AllGardenSet", function() {
  var gardenSet;
  var garden;

  beforeEach(function() {
    garden = new Garden({demands:[{name:'corn'}, {name:'potato'}],
                         supplies:[{name:'beet'}, {name:'bean'}]});
    gardenSet = new AllGardenSet();
  });

  it("should create an empty array of gardens and crop indices", function() {
    expect(gardenSet.set).toEqual([]);
    expect(gardenSet.demandCropIndex).toEqual({});
    expect(gardenSet.supplyCropIndex).toEqual({});
  });

  describe("#addGarden", function() {
    it("should add a garden to the set", function() {
      gardenSet.addGarden(garden);
      expect(gardenSet.set).toContain(garden);
    });

    it("should bind the garden to a 'removed' event", function() {
      gardenSet.addGarden(garden);
      $(garden).trigger('removed');
      expect(gardenSet.set).toNotContain(garden);
    });

    it("should add supplies/demanded crop indices", function() {
      gardenSet.addGarden(garden);
      expect(gardenSet.demandCropIndex).toEqual({'corn':[0], 'potato':[0]});
      expect(gardenSet.supplyCropIndex).toEqual({'beet':[0], 'bean':[0]});
    });
  });

  describe("#clearIndex", function() {
    it("should clear the indices", function() {
      gardenSet.addGarden(garden);
      gardenSet.clearIndex();
      expect(gardenSet.demandCropIndex).toEqual({});
      expect(gardenSet.supplyCropIndex).toEqual({});
    });
  });
});