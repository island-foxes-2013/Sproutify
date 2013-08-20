function Browser(allGardenSet, filter, mySupply, myDemand){
  this.allGardenSet = allGardenSet;
  this.filter = filter;
  this.mySupply = mySupply;
  this.myDemand = myDemand;

  this.myDemandIndex = {};
  this.mySupplyIndex = {};
  this.allDemandIndex = {};
  this.allSupplyIndex = {};
}

Browser.prototype = {
  refreshDemandIndices: function(){

  },
  refreshSupplyIndices: function(){
    
  }
}

function BrowserView(allGardenSet, filter, mySupply, myDemand){
  this.allGardenSet = allGardenSet;
  this.filter = filter;
  this.mySupply = mySupply;
  this.myDemand = myDemand;
  this.$elem = $("#browser");

  this.updateView();
  this.bindEvents();
}

BrowserView.prototype = {
  bindEvents: function(){
    var self = this;
    $(this.allGardenSet).on("gardenAdded", function(){
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
  separateMyData: function(){

  },
  updateView: function(){
    var browseData = {
      demand: this.allGardenSet.demandCropIndex,
      supply: this.allGardenSet.supplyCropIndex
    };
    this.$elem.html(HandlebarsTemplates['browser'](browseData));
  }
};