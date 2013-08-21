function MySupplies(){
  this.mySupplies = [];
  this.mySuppliesNames = [];
  this.getSupplies();
}

MySupplies.prototype = {
  getSupplies: function(){

    var self = this;
    $.ajax({
      url: '/supplies',
      type: 'GET'
    }).done(function(response){ 
      self.refreshSupplies(response.supplies);
      $(self).trigger("updatedData");
    });
  },
  refreshSupplies: function(supplies){
    for (var i = 0; i < supplies.length; i++){
      if (!this.mySuppliesNames.includes(supplies[i].crop.name)) {
        this.addSupply(supplies[i]);
      } 
    }
    this.mapNames();
  },
  addSupply: function(supply){
    var newSupply = new MySupply(supply);
    var newSupplyView = new MySupplyView(newSupply);

    this.mySupplies.push(newSupply);

    var self = this;
    $(newSupply).on('removed',function(){
      self.mySupplies.exterminate(this);
      self.mapNames();
    });
    $(newSupply).on('updated',function(){
      self.mySupplies.exterminate(this);
      self.mapNames();
      self.getSupplies();
    });
  },
  mapNames: function(){
    this.mySuppliesNames = $.map(this.mySupplies, function(supply){
      return supply.crop.name;
    });
  }

};