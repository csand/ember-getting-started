define (require) ->
  app = require 'app'
  app.Router.map ->
    this.resource 'todos', path: '/'
