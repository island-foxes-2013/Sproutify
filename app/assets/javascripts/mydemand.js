function MyDemand(){
  this.myDemand = [];
  this.myDemandNames = [];
  this.getDemand();
}

MyDemand.prototype = {
  getDemand: function(){

    var self = this;
    $.ajax({
      url: '/demands',
      type: 'GET'
    }).done(function(response){ 
      self.myDemand = response.demands;
      self.mapNames();
      $(self).trigger("updatedData");
    });
  },
  mapNames: function(){
    this.myDemandNames = $.map(this.myDemand, function(crop){
      crop.name;
    });
  }

};

function MyDemandView(myDemand){
  this.myDemand = myDemand;
  this.showForm();
  this.bindEvents();
}

MyDemandView.prototype = {
  showForm: function(){
    $('#add-demand').html(HandlebarsTemplates['add_demand']);
  },
  bindEvents: function(){
    var self = this;
    $("body").on('ajax:success', '#add-demands-form', function(){
      self.myDemand.getDemand();
    });
  }
};