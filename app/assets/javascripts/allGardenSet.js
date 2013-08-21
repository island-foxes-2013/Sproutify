function AllGardenSet(){
  this.set = [];
  this.demandCropIndex = {};
  this.supplyCropIndex = {};
}

AllGardenSet.prototype.addGarden = function(garden){
  this.set.push(garden);

  this.findDemandedCrops(garden);
  this.findSuppliedCrops(garden);

  $(this).trigger('gardenAdded', garden);

  var self = this;
  $(garden).on('removed', function(e) {
    self.set.exterminate(this);
  });
};

AllGardenSet.prototype.findDemandedCrops = function(garden) {
  var self = this;
  // var blah = garden;
  $(garden.demandedCrops()).each(function() {
    if (self.demandCropIndex.hasOwnProperty(this.name)) {
      self.demandCropIndex[this.name].push(self.set.indexOf(garden));
    } else {
      self.demandCropIndex[this.name] = [self.set.indexOf(garden)];
    }
  });
};

AllGardenSet.prototype.findSuppliedCrops = function(garden) {
  var self = this;
  $(garden.suppliedCrops()).each(function() {
    if (self.supplyCropIndex.hasOwnProperty(this.name)) {
      self.supplyCropIndex[this.name].push(self.set.indexOf(garden));
    } else {
      self.supplyCropIndex[this.name] = [self.set.indexOf(garden)];
    }
  });
};

AllGardenSet.prototype.clearIndex = function() {
  this.demandCropIndex = {};
  this.supplyCropIndex = {};
};