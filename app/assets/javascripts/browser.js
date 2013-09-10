function Browser(allGardenSet, mySupply, myDemand){
  this.allGardenSet = allGardenSet;
  this.mySupply = mySupply;
  this.myDemand = myDemand;

  this.myDemandIndex = {};
  this.allDemandIndex = {};
  this.myGrowingIndex = {};
  this.myHarvestingIndex = {};
  this.allSupplyIndex = {};
  this.bindEvents();
}

Browser.prototype = {
  bindEvents: function(){
    var self = this;
    $(this.mySupply).on("updatedData", function() {self.refreshIndices()});
    $(this.myDemand).on("updatedData", function() {self.refreshIndices()});
    $(this.allGardenSet).on("gardenAdded", function() {self.refreshIndices()});
    $(this.allGardenSet).on("refresh", function() {self.refreshIndices()});
  },
  refreshIndices: function(){
    this.refreshDemandIndices();
    this.refreshSupplyIndices();
    $(this).trigger("updatedIndices");
  },
  refreshDemandIndices: function(){
    this.myDemandIndex = {};
    this.allSupplyIndex = {};
    for (crop in this.allGardenSet.supplyCropIndex){
      if (this.myDemand.myDemandsNames.includes(crop)){
        this.myDemandIndex[crop] = this.allGardenSet.supplyCropIndex[crop];
      } else {
        this.allSupplyIndex[crop] = this.allGardenSet.supplyCropIndex[crop];
      }
    }
  },
  refreshSupplyIndices: function(){
    this.myGrowingIndex = {};
    this.myHarvestingIndex = {};
    this.allDemandIndex = {};
    for (crop in this.allGardenSet.demandCropIndex){
      if (this.mySupply.mySuppliesNames.includes(crop)){
        var cropIndex = this.mySupply.mySuppliesNames.indexOf(crop);
        if (this.mySupply.mySupplies[cropIndex].status.name == "growing"){
          this.myGrowingIndex[crop] = this.allGardenSet.demandCropIndex[crop];
        } else if (this.mySupply.mySupplies[cropIndex].status.name == "harvested"){
          this.myHarvestingIndex[crop] = this.allGardenSet.demandCropIndex[crop];
        }
      } else {
        this.allDemandIndex[crop] = this.allGardenSet.demandCropIndex[crop];
      }
    }
  }
};
