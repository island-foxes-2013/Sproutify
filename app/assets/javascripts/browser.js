function Browser(allGardenSet, filter, mySupply, myDemand){
  this.allGardenSet = allGardenSet;
  this.filter = filter;
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
  },
  refreshIndices: function(){
    this.refreshDemandIndices();
    this.refreshSupplyIndices();
    $(this).trigger("updatedIndices");
  },
  refreshDemandIndices: function(){
    this.myDemandIndex = {};
    this.allDemandIndex = {};
    for (crop in this.allGardenSet.supplyCropIndex){
      if (this.myDemand.myDemandNames.includes(crop)){
        this.myDemandIndex[crop] = this.allGardenSet.supplyCropIndex[crop];
      } else {
        this.allSupplyIndex[crop] = this.allGardenSet.supplyCropIndex[crop];
      }
    }
  },
  refreshSupplyIndices: function(){
    this.mySupplyIndex = {};
    this.allSupplyIndex = {};
    for (crop in this.allGardenSet.demandCropIndex){
      if (this.mySupply.growingNames.includes(crop)){
        this.myGrowingIndex[crop] = this.allGardenSet.demandCropIndex[crop];
      } else if (this.mySupply.harvestingNames.includes(crop)) {
        this.myHarvestingIndex[crop] = this.allGardenSet.demandCropIndex[crop];
      } else {
        this.allDemandIndex[crop] = this.allGardenSet.demandCropIndex[crop];
      }
    }
  }
};

function BrowserView(browser){
  this.browser = browser;
  this.$elem = $("#browser");

  this.updateView();
  this.bindEvents();
}

BrowserView.prototype = {
  bindEvents: function(){
    var self = this;
    $(this.browser).on("updatedIndices", function(){
      self.updateView();
    });

    $("body").on("click",".supply-filter", function(){
      var cropName = $(this).attr("data-name");
      if ($(this).is(':checked')){
        self.filter.addSupply(cropName);
      } else {
        self.filter.removeSupply(cropName);
      }
      self.filter.filter();
    });

    $("body").on("click",".demand-filter", function(){
      var cropName = $(this).attr("data-name");
      if ($(this).is(':checked')){
        self.filter.addDemand(cropName);
      } else {
        self.filter.removeDemand(cropName);
      }
      self.filter.filter();
    });
  },
  updateView: function(){
    var browseData = {
      myDemand: this.browser.myDemandIndex,
      allSupply: this.browser.allSupplyIndex,
      
      myGrowing: this.browser.myGrowingIndex,
      myHarvesting: this.browser.myHarvestingIndex,
      allDemand: this.browser.allDemandIndex
    };
    this.$elem.html(HandlebarsTemplates['browser'](browseData));
  }
};