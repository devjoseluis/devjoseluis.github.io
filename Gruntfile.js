/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n',
    
    //Construye el sitio en _site
    jekyll: {
      dist: {
        options: {
          src: '.',
          dest: '_site',
          config: '_config.yml',
          safe: true
        }
      }
    },
    //Levanta el server para ver lo de _site
    connect: {
      server: {
        options: {
          port: 4000,
          base: '_site'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          skrollr: true,
          Trianglify: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js_source: {
        src: ['js-source/**/*.js']
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js_source: {
        files: [
      {
        src: 'js-source/cv.js',
        dest: 'js/cv.js'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          outputStyle: 'compressed'
        }
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      markup: {
        files: ['index.html','_includes/*.html','_posts/*'],
        tasks: ['jekyll']
      },
      js_source: {
        files: '<%= jshint.js_source.src %>',
        tasks: ['jshint:js_source', 'uglify:js_source', 'jekyll']
      },
      css_source: {
        files: '<%= compass.dist.options.sassDir %>/**/*.scss',
        tasks: ['compass:dist', 'jekyll']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //Jekyll
  grunt.loadNpmTasks('grunt-jekyll');
  //Server at http://localhost:4000
  grunt.loadNpmTasks('grunt-contrib-connect');
  // Default task.
  grunt.registerTask('default', ['jshint',  'uglify', 'compass', 'jekyll', 'connect', 'watch']);

};
