var Todos = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
