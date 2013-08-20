function Browser(map){
  this.map = map;
  this.browseData = {gardens: map.markers};
  this.bindEvents();
}

Browser.prototype = {
  bindEvents: function(){
    var self = this;
    $("body").on("newMarkers", function(){
      self.updateMarkers();
    });
  },
  updateMarkers: function(){
    this.browseData.gardens = this.map.markers;
    $("body").trigger("newBrowseData");
  }
};

function BrowserView(allGardenSet){
  this.allGardenSet = allGardenSet;
  this.$elem = $("#browser");

  this.updateView();
  this.bindEvents();
}

BrowserView.prototype = {
  bindEvents: function(){
    var self = this;
    $(this.allGardenSet).on("gardenAdded", function(){ self.updateView() });
  },
  updateView: function(){
    var browseData = {
      demand: this.allGardenSet.demandCropIndex,
      supply: this.allGardenSet.supplyCropIndex
    }
    this.$elem.html(HandlebarsTemplates['browser'](browseData));
  }
};