Array.prototype.exterminate = function(element) {
  var index = this.indexOf(element);
  if (index != -1) {
    this.splice (index, 1);
  }
  this
}
