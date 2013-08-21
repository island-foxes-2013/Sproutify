function BrowserView(browser, filter){
  this.browser = browser;
  this.filter = filter;
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

    //Nav pills
    $('body').on('click', '#share_link', function(e) {
      e.preventDefault();
      $('ul.nav-pills li.active').removeClass('active');
      $(this).closest('li').addClass('active');
      $('#browser-request').hide();
      $('#browser-share').show();
      // $('#browser-body').html(HandlebarsTemplates['browser_sharing'](self.browseData));
    });
    $('body').on('click', '#request_link', function(e) {
      e.preventDefault();
      $('ul.nav-pills li.active').removeClass('active');
      $(this).closest('li').addClass('active');
      $('#browser-share').hide();
      $('#browser-request').show();
      // $('#browser-body').html(HandlebarsTemplates['browser_requesting'](self.browseData));
    });
  },
  updateView: function(){
    this.browseData = {
      myDemand: this.browser.myDemandIndex,
      allSupply: this.browser.allSupplyIndex,
      myGrowing: this.browser.myGrowingIndex,
      myHarvesting: this.browser.myHarvestingIndex,
      allDemand: this.browser.allDemandIndex
    };
    this.$elem.html(HandlebarsTemplates['browser']);
    $('#browser-share').html(HandlebarsTemplates['browser_sharing'](this.browseData));
    $('#browser-request').html(HandlebarsTemplates['browser_requesting'](this.browseData));
    $('#browser-request').hide();
    this.recheckBoxes();
  },
  recheckBoxes: function() {
    $.each(this.filter.supplyCropFilter, function() {
      $('.supply-filter[data-name='+this+']').prop('checked', true);
    });
    $.each(this.filter.demandCropFilter, function() {
      $('.demand-filter[data-name='+this+']').prop('checked', true);
    });
  }
};