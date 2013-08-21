function MySupply(supply){
  this.id = supply.id;
  this.status = supply.status;
  this.crop = supply.crop;
}

MySupply.prototype = {
  remove: function(){
    $(this).trigger('removed');
  },
  update: function(){
    $(this).trigger('updated');
  }
};

function MySupplyView(mySupply){
  this.mySupply = mySupply;
  this.listItemSelector = "#supply-" + this.mySupply.id;
  this.deleteLinkSelector = "#remove-supply-" + this.mySupply.id;
  this.harvestLinkSelector = "#harvest-supply-" + this.mySupply.id;
  this.$parent = $("body");
  this.$list = $("#my-"+mySupply.status.name+"-supplies");

  this.appendSupply();
  this.$listItem = $(this.listItemSelector);
  
  this.bindEvents();
}

MySupplyView.prototype = {
  appendSupply: function(){
    this.$list.prepend(HandlebarsTemplates['mySupply'](this.mySupply));
  },
  bindEvents: function(){
    var self = this;
    this.$parent.on("ajax:success", this.deleteLinkSelector, function(event, response, xhr, element){
      if (response.hasOwnProperty("errors")){
        self.renderErrors(response);
      }
      self.mySupply.remove();
    });
    this.$parent.on("ajax:success", this.harvestLinkSelector, function(event, response, xhr, element){
      if (response.hasOwnProperty("errors")){
        self.renderErrors(response);
      }
      self.mySupply.update();
    });
    $(this.mySupply).on("removed", function(){
      self.$listItem.remove();
    });
    $(this.mySupply).on("updated", function(){
      self.$listItem.remove();
    });
  },
  renderErrors: function(response){
    this.$list.parent().find('.alert').remove();
    this.$list.before(HandlebarsTemplates['error'](response));
  }
};