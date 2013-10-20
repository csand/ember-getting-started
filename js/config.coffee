require.config
  paths:
    lodash: 'lib/lodash'
    jquery: 'lib/jquery'
    handlebars: 'lib/handlebars.runtime'
    ember: 'lib/ember'
    'ember-data': 'lib/ember-data'
  shim:
    'ember-data':
      deps: 'ember'
