function BrowserView(browser, filter){
  this.browser = browser;
  this.filter = filter;
  this.$elem = $("#browser");

  this.$elem.html(HandlebarsTemplates['browser']);
  this.$elem.animate({
    "right": "0px"
  }, 600)
  $('#browser-share').html(HandlebarsTemplates['browser_sharing']);
  $('#browser-request').html(HandlebarsTemplates['browser_requesting']);
  $('#browser-request').hide();

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
      if ($(this).hasClass('active')){
        $(this).removeClass('active');
        self.filter.addSupply(cropName);
      } else {
        $(this).addClass('active');
        self.filter.removeSupply(cropName);
      }
      self.filter.filter();
    });

    $("body").on("click",".demand-filter", function(){
      var cropName = $(this).attr("data-name");
      if ($(this).hasClass('active')){
        $(this).removeClass('active');
        self.filter.addDemand(cropName);
      } else {
        $(this).addClass('active');
        self.filter.removeDemand(cropName);
      }
      self.filter.filter();
    });

    //Nav pills
    $('body').on('click', '#share_link', function(e) {
      e.preventDefault();
      self.filter.status = "supply";
      self.filter.filter();
      $(this).parent().find('.btn-primary').removeClass('btn-primary').addClass('btn-default');
      $(this).removeClass('btn-default').addClass('btn-primary');
      $('#browser-request').hide();
      $('#browser-share').show();
    });
    $('body').on('click', '#request_link', function(e) {
      e.preventDefault();
      self.filter.status = "demand";
      self.filter.filter();
      $(this).parent().find('.btn-primary').removeClass('btn-primary').addClass('btn-default');
      $(this).removeClass('btn-default').addClass('btn-primary');
      $('#browser-share').hide();
      $('#browser-request').show();
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
    $('#browser-share').html(HandlebarsTemplates['browser_sharing'](this.browseData));
    $('#browser-request').html(HandlebarsTemplates['browser_requesting'](this.browseData));
    this.recheckBoxes();
  },
  recheckBoxes: function() {
    $.each(this.filter.supplyCropFilter, function() {
      if ($('.supply-filter[data-name='+this+']').length) {
        $('.supply-filter[data-name='+this+']').removeClass('active');  
      }
    });
    $.each(this.filter.demandCropFilter, function() {
      if ($('.demand-filter[data-name='+this+']').length) {
        $('.demand-filter[data-name='+this+']').removeClass('active'); 
      }
    });
  }
};