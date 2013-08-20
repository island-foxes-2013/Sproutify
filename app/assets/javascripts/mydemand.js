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
      if (!this.myDemandsNames.includes(demands[i].name)){
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
    });
  },
  mapNames: function(){
    this.myDemandsNames = $.map(this.myDemands, function(crop){
      return crop.name;
    });
  }

};

function MyDemandsForm(myDemands){
  this.myDemands = myDemands;

  this.linkSelector = ".demand-manager-link";
  this.modalSelector = "#demand-manager-modal";

  this.formSelector = '#new-demand-form';
  this.$parent = $("body");
  // this.$modal = $(this.modalSelector);
  this.$form = $(this.formSelector);

  this.appendForm();
  this.bindEvents();
}

MyDemandsForm.prototype = {
  appendForm: function(){
    $('#add-demand-form').html(HandlebarsTemplates['add_demand']);
  },
  bindEvents: function(){
    var self = this;
    this.$parent.on('ajax:success', this.formSelector, function(event, response, xhr, element){
      self.renderErrors(response);
      self.myDemands.getDemands();
    });
  },
  renderErrors: function(response){
    this.$form.find('.alert').remove();
    this.$form.find(".modal-body").prepend(HandlebarsTemplates['error'](response));
  }
};

function MyDemand(demand){
  this.name = demand.name;
}

MyDemand.prototype = {
  remove: function(){
    $(this).trigger('removed');
  }
};

function MyDemandView(myDemand){
  this.myDemand = myDemand;
  this.appendDemand();
  this.bindEvents();
  this.$parent = $("body");
}

MyDemandView.prototype = {
  bindEvents: function(){
    this.$parent.on("ajax:success", "demand-" + this.myDemand.name, function(){

    });
    // call remove in here
  },
  appendDemand: function(){
    $("#my-demands").prepend(HandlebarsTemplates['myDemand'](this.myDemand));
  }
};