function ManageDemandsModal() {
  this.bindEvents();
}

ManageDemandsModal.prototype = {
  bindEvents: function(){
    var self = this;
    $("#demand-manager").on('click', '#close', function(event) {
      event.preventDefault();
      self.hide();
    });
  },
  show: function() {
    Avgrund.show('#demand-manager');
  },
  hide: function() {
    Avgrund.hide();
  },
};