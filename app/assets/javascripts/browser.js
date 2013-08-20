function BrowserView(allGardenSet, filter){
  this.allGardenSet = allGardenSet;
  this.filter = filter;
  this.$elem = $("#browser");

  this.updateView();
  this.bindEvents();
}

BrowserView.prototype = {
  bindEvents: function(){
    var self = this;
    $(this.allGardenSet).on("gardenAdded", function(){ self.updateView() });
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
      demand: this.allGardenSet.demandCropIndex,
      supply: this.allGardenSet.supplyCropIndex
    }
    this.$elem.html(HandlebarsTemplates['browser'](browseData));
  }
};