function MySupply(){
  this.growing = [];
  this.harvesting = [];
  this.growingNames = [];
  this.harvestingNames = [];
  this.getSupply();
}

MySupply.prototype = {
  getSupply: function(){

    var self = this;
    $.ajax({
      url: '/supplies',
      type: 'GET'
    }).done(function(response){ 
      self.growing = response.growing;
      self.harvest = response.harvesting;
      self.mapNames();
      $(self).trigger("updatedData");
    });
  },
  mapNames: function(){
    this.growingNames = $.map(this.growing, function(crop){
      return crop.name;
    });
    this.harvestingNames = $.map(this.harvesting, function(crop){
      return crop.name;
    });
  }

};

function MySupplyView(mySupply){
  this.mySupply = mySupply;
  this.showForm();
  this.bindEvents();
}

MySupplyView.prototype = {
  showForm: function(){
    $('#add-supply').html(HandlebarsTemplates['add_supply']);
  },
  bindEvents: function(){
    var self = this;
    $("body").on('ajax:success', '#add-supplies-form', function(){
      self.mySupply.getSupply();
    });
  }
};