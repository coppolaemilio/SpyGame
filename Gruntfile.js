(function () {
'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          './style/main.css': './style/main.scss'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          './style/main.css': './style/main.css',
        }
      }
    },
    watch: {
      style: {
        files: ['./style/*.scss'],
        tasks: ['default'],
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'cssmin']);
};

}());
