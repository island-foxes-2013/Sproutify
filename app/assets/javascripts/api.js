function API() {

}
API.prototype.sendRequest = function(request) {
  return $.ajax(request);
}