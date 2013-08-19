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

function BrowserView(browser){
  this.browser = browser;
  this.$elem = $("#browser");

  this.updateView();
  this.bindEvents();
}

BrowserView.prototype = {
  bindEvents: function(){
    var self = this;
    $("body").on("newBrowseData", function(){ self.updateView() });
  },
  updateView: function(){
    this.$elem.html(HandlebarsTemplates['browser'](this.browser.browseData));
  }
};