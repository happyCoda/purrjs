'use strict';

module.exports = function (grunt) {
  var time = require('time-grunt');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'bower_components/**/*',
          'node_modules/**/*',
          '.grunt/**/*',
          '**/require.js',
          '**/jquery*.js',
          '**/react*.js',
          '**/bundle.js',
          '**/bundleSpec.js'
        ]
      },

      dev: {
        src: ['**/*.js']
      }
    },

    jasmine: {
      options: {
        specs: 'test/specs/dest/*Spec.js',
        outfile: 'test/_SpecRunner.html'
      },

      dev: {}
    },

    uglify: {
      options: {},

      build: {}
    },

    browserify: {
      options: {},

      dev: {
        files: {
          'js/dest/bundle.js': ['js/*.js']
        }
      },

      test: {
        files: {
          'test/specs/dest/bundleSpec.js': ['test/specs/*Spec.js']
        }
      }
    },

    clean: {
      css: {
        src: ['css/*.css']
      }
    },

    less: {
      options: {
        compress: true
      },

      dev: {
        src: ['css/*.less'],
        dest: 'css/style.css'
      }
    },

    babel: {
      options: {
        plugins: ['transform-react-jsx'],
        presets: ['react']
      },

      dev: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '.',
          src: ['jsx/*.jsx'],
          dest: 'js/',
          ext: '.js'
        }]
      }
    },

    connect: {
      options: {
        hostname: 'localhost',
        port: 1337,
        base: './'
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
          '!**/bundle.js',
          '!**/bundleSpec.js',
          '!**/require.js',
          '!**/jquery*.js',
          '!**/*css',
          '!**/header.js',
          '!**/main.js',
          '!**/menu.js',
          '!**/section.js'
        ],
        tasks: ['babel:dev', 'jshint:dev', 'browserify:test', 'jasmine:dev', 'clean:css', 'less:dev']
      }
    }
  });

  time(grunt);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('observe', ['connect:dev', 'watch:dev']);
};
