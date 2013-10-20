define (require) ->
  ember = require 'ember'
  window.Todos = ember.Application.create(
    LOG_TRANSITIONS: true
  )
