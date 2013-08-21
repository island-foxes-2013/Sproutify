function MyDemand(demand){
  this.id = demand.id;
  this.crop = demand.crop;
}

MyDemand.prototype = {
  remove: function(){
    $(this).trigger('removed');
  }
};

function MyDemandView(myDemand){
  this.myDemand = myDemand;
  this.listSelector = "#my-demands";
  this.listItemSelector = "#demand-" + this.myDemand.id;
  this.deleteLinkSelector = "#remove-demand-" + this.myDemand.id;
  this.$parent = $("body");
  this.$list = $(this.listSelector);

  this.appendDemand();
  this.$listItem = $(this.listItemSelector);
  
  this.bindEvents();
}

MyDemandView.prototype = {
  appendDemand: function(){
    this.$list.prepend(HandlebarsTemplates['myDemand'](this.myDemand));
  },
  bindEvents: function(){
    var self = this;
    this.$parent.on("ajax:success", this.deleteLinkSelector, function(){
      self.myDemand.remove();
    });
    $(this.myDemand).on("removed", function(){
      self.$listItem.remove();
    });
  },
  renderErrors: function(response){
    this.$list.find('.alert').remove();
    this.$list.find(".modal-body").prepend(HandlebarsTemplates['error'](response));
  }
};