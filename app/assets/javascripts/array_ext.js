Array.prototype.exterminate = function(element) {
  var index = this.indexOf(element);
  if (index != -1) {
    this.splice (index, 1);
  }
  this
}

Array.prototype.diff = function(a) {
  return this.filter(function(i) {
    return !(a.includes(i));
  })
}

Array.prototype.includes = function(element) {
  return this.indexOf(element) > -1;
}