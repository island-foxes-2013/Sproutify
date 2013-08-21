function Session(data){
  this.data = data || {};
  this.api = new API();
  this.refresh();
}

Session.prototype.refresh = function() {
  var self = this;
  this.sendRequest({ 
    url: "/sessions",
    method: "GET"
  }).done(function(response) {
    if (self.isLoggedIn()) {
      $(self).trigger("loggedIn");
    } else {
      $(self).trigger("loggedOut");
    }
  });
}

Session.prototype.isLoggedIn = function() {
  return this.data.logged_in === true;
}

Session.prototype.user = function() {
  return this.data.user
}

Session.prototype.errors = function() {
  return this.data.errors || {}
}

Session.prototype.signUp = function(data) {
  return this.sendRequest({
    url: "/users",
    method: "post",
    data: data
  }).done(function() {
    $(self).trigger('loggedIn');  
  });
}

Session.prototype.logIn = function(data) {
  var self = this;
  return this.sendRequest({
    url: "/sessions",
    method: "post",
    data: data
  }).done(function() {
    $(self).trigger('loggedIn');
  });
}

Session.prototype.logOut = function() {
  var self = this;
  return this.sendRequest({
    url: "/sessions",
    method: "DELETE"
  }).done(function() {
    $(self).trigger("loggedOut");
  });
}

Session.prototype.sendRequest = function(request) {
  var self = this;
  var promise = $.Deferred();
  this.api.sendRequest(request).done(function(response) {
    self.update(response);
    if (response.errors) {
      promise.reject(self);
    } else {
      promise.resolve(self);
    }
  });
  return promise;
}

Session.prototype.update = function(data) {
  this.data.logged_in = data.logged_in;
  this.data.user = data.user;
  this.data.errors = data.errors;
}

