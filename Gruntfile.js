module.exports = function(grunt) {
    // require('jit-grunt')(grunt, {
    //
    // });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "main.css": "main.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    plugins: [
                        new(require('less-plugin-autoprefix'))({
                            browsers: ["last 2 versions"]
                        }),
                        new(require('less-plugin-clean-css'))(cleanCssOptions)
                    ],
                    modifyVars: {
                        imgPath: '"http://mycdn.com/path/to/images"',
                        bgColor: 'red'
                    }
                },
                files: {
                    "path/to/result.css": "path/to/source.less"
                }
            }
        },

        watch: {
            styles: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};
