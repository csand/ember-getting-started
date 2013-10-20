grunt = require 'grunt'
path = require 'path'

taskFiles = (srcdir, srcext, destext) ->
  result = {}
  for filename in grunt.file.expand "#{srcdir}/**/*#{srcext}"
    dir = path.dirname filename
    name = path.basename filename, srcext
    result[path.join(dir, name + destext)] = filename
  result

module.exports = (grunt) ->
  config =
    pkg: grunt.file.readJSON 'package.json'
    requirejs:
      dev:
        options:
          baseUrl: 'js/'
          name: 'main'
          mainConfigFile: 'js/config.js'
          out: 'build/js/main.js'
          optimize: 'uglify2'
          generateSourceMaps: true
          preserveLicenseComments: false
    jade:
      compile:
        files:
          'build/index.html': 'index.jade'
    emberTemplates:
      compile:
        options:
          amd: true
          templateBasePath: /templates\//
        files:
          'js/templates.js': 'templates/*.hbs'
    coffee:
      dev:
        options:
          bare: true
          sourceMap: true
        files: taskFiles 'js', '.coffee', '.js'
    copy:
      compile:
        files: [
          {
            src: [
              'img/*'
              'css/*'
              'js/lib/require.js'
              'js/config.js'
            ]
            dest: 'build/'
          }
        ]

  grunt.initConfig config
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-handlebars'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-ember-templates'
  grunt.registerTask 'default', ['emberTemplates:compile', 'jade:compile',
    'coffee:dev', 'copy:compile', 'requirejs:dev']
