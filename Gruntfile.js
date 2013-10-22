var grunt = require('grunt');
var path = require('path');

module.exports = function(grunt) {
  var uglifyFiles = [
    'js/templates.js',
    'js/application.js',
    'js/router.js',
    'js/models/*.js'
  ];
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    emberTemplates: {
      compile: {
        options: {
          amd: false,
          templateBasePath: /templates\//
        },
        files: {'js/templates.js': 'templates/*.hbs'}
      }
    },
    copy: {
      build: {
        files: {
          'build/': [
            'index.html',
            'img/*',
            'css/*'
          ]
        }
      }
    },
    watch: {
      templates: {
        files: ['**/*.hbs'],
        tasks: ['emberTemplates:compile'],
        options: {spawn: false}
      },
      uglify: {
        files: [
          'js/templates.js',
          'js/application.js',
          'js/router.js',
          'js/models/*.js'
        ],
        tasks: ['uglify:dev']
      }
    },
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          preserveComments: 'all',
          sourceMap: 'js/todos.js.map'
        },
        files: {
          'js/todos.js': uglifyFiles
        }
      },
      build: {
        options: {
          mangle: true,
          compress: true,
          report: 'min',
          preserveComments: false
        },
        files: {
          'build/js/todos.js': uglifyFiles,
          'build/js/lib/jquery.js': 'js/lib/jquery.js',
          'build/js/lib/lodash.js': 'js/lib/lodash.js',
          'build/js/lib/handlebars.runtime.js': 'js/lib/handlebars.runtime.js',
          'build/js/lib/ember.js': 'js/lib/ember.js',
          'build/js/lib/ember-data.js': 'js/lib/ember-data.js'
        }
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['emberTemplates:compile', 'uglify:build', 'copy:build']);
};
