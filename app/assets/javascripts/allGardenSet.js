function AllGardenSet(){
  this.set = [];
  this.demandCropIndex = {};
  this.supplyCropIndex = {};
}

AllGardenSet.prototype.addGarden = function(garden){
  this.set.push(garden);

  // this.findDemandedCrops(garden);
  // this.findSuppliedCrops(garden);
  this.refreshIndexes();

  $(this).trigger('gardenAdded', garden);

  var self = this;
  $(garden).on('removed', function(e) {
    
    $(this.suppliedCrops()).each(function(){
      self.supplyCropIndex[this.name].exterminate(self.set.indexOf(garden));
    })
    $(this.demandedCrops()).each(function(){
      self.demandCropIndex[this.name].exterminate(self.set.indexOf(garden));
    })
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
}

AllGardenSet.prototype.refreshIndexes = function() {
  this.clearIndex();
  self = this;
  $.each(this.set, function() {
    self.findSuppliedCrops(this);
    self.findDemandedCrops(this);
  });
  $(this).trigger('refresh');
}

