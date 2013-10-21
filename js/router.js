define(function(require) {
  var app = require('app');

  app.Router.map(function() {
    this.resource('todos', {path: '/'});
  });
});
