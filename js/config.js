require.config({
  paths: {
    lodash: 'lib/lodash',
    jquery: 'lib/jquery',
    handlebars: 'lib/handlebars.runtime',
    ember: 'lib/ember',
    'ember-data': 'lib/ember-data'
  },
  shim: {
    ember: {
      deps: ['jquery', 'handlebars'],
      exports: 'Ember'
    },
    'ember-data': {
      deps: 'ember',
      exports: 'DS'
    }
  }
});
