var grunt = require('grunt');
var path = require('path');

module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      dev: {
        options: {
          baseUrl: 'js/',
          name: 'main',
          mainConfigFile: 'js/config.js',
          out: 'build/js/main.js',
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },
    emberTemplates: {
      compile: {
        options: {
          amd: true,
          templateBasePath: /templates\//
        },
        files: {
          'js/templates.js': 'templates/*.hbs'
        }
      }
    },
    copy: {
      compile: {
        files: [
          {
            src: [
              'index.html',
              'img/*',
              'css/*',
              'js/lib/require.js',
              'js/config.js'
            ],
            dest: 'build/'
          }
        ]
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('default', ['emberTemplates:compile', 'copy:compile', 'requirejs:dev']);
};
