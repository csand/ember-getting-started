define(function(require) {
  var ember = require('ember');
  var Todos = ember.Application.create({
    LOG_TRANSITIONS: true
  });
  window.Todos = Todos;
});
