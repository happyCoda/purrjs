module.exports = function (grunt) {
  var time = require('time-grunt');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        strict: 'global',
        undef: false,
        browser: true,
        devel: true,
        jasmine: true,
        validthis: true,
        globals: {
          'window': true,
          'define': true,
          'require': true,
          'Purr': true,
          'Utils': true,
          'Ui': true,
          'MVC': true,
          'module': true
        },
        sub: true,
        ignores: [
          'bower_components/**/*',
          'node_modules/**/*',
          '.grunt/**/*',
          '**/require.js',
          '**/jquery*.js',
          'Gruntfile.js',
          'utilsSpec.js'
        ]
      },

      dev: {
        src: ['**/*.js']
      }
    },

    jasmine: {
      options: {
        specs: 'test/specs/*Spec.js'
      },

      dev: {
        src: 'js/utils.js'
      }
    },

    uglify: {
      options: {},

      build: {}
    },

    express: {
      options: {
        hostname: 'localhost',
        port: 1337,
        bases: ['./']
      },

      dev: {}
    },

    watch: {
      options: {
        livereload: true
      },

      dev: {
        files: [
          '**/*',
          '!bower_components/**',
          '!node_modules/**',
          '!.grunt/**',
          '!**/_SpecRunner.html',
          '!**/require.js',
          '!**/jquery*.js',
        ],
        tasks: ['jshint:dev', 'jasmine:dev']
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      workflow: ['express:dev', 'watch:dev'],
      server: ['express:dev'],
      watcher: ['watch:dev']
    }
  });

  time(grunt);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('observe', ['express:dev', 'watch:dev']);
};
