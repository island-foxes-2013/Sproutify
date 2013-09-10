function MyDemands(){
  this.myDemands = [];
  this.myDemandsNames = [];
  this.getDemands();
}

MyDemands.prototype = {
  getDemands: function(){

    var self = this;
    $.ajax({
      url: '/demands',
      type: 'GET'
    }).done(function(response){ 
      self.refreshDemands(response.demands);
      $(self).trigger("updatedData");
    });
  },
  refreshDemands: function(demands){
    for (var i = 0; i < demands.length; i++){
      if (!this.myDemandsNames.includes(demands[i].crop.name)){
        this.addDemand(demands[i]);
      }
    }
    this.mapNames();
  },
  addDemand: function(demand){
    var newDemand = new MyDemand(demand);
    var newDemandView = new MyDemandView(newDemand);

    this.myDemands.push(newDemand);

    var self = this;
    $(newDemand).on('removed', function(){
      self.myDemands.exterminate(this);
      self.getDemands();
    });
  },
  mapNames: function(){
    this.myDemandsNames = $.map(this.myDemands, function(demand){
      return demand.crop.name;
    });
  }

};

